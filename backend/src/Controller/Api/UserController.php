<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST', 'OPTIONS'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        // Define origem permitida para CORS
        $allowedOrigin = 'http://localhost:5173';

        // Resposta para requisição OPTIONS (CORS preflight)
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse(null, Response::HTTP_NO_CONTENT, [
                'Access-Control-Allow-Origin' => $allowedOrigin,
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
            ]);
        }

        $data = $request->request->all();
        $file = $request->files->get('photo');

        // Verifica campos obrigatórios
        if (empty($data['email']) || empty($data['password']) || empty($data['roles'])) {
            return $this->json(
                ['message' => 'Campos obrigatórios ausentes: email, senha e roles.'],
                Response::HTTP_BAD_REQUEST,
                ['Access-Control-Allow-Origin' => $allowedOrigin]
            );
        }

        // Cria novo usuário e preenche dados básicos
        $user = new User();
        $user->setEmail($data['email']);
        $user->setName($data['name'] ?? null);
        $user->setBio($data['bio'] ?? null);

        // Processa redes sociais JSON
        if (!empty($data['socialLinks'])) {
            $socialLinks = json_decode($data['socialLinks'], true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json(
                    ['message' => 'Formato inválido para socialLinks.'],
                    Response::HTTP_BAD_REQUEST,
                    ['Access-Control-Allow-Origin' => $allowedOrigin]
                );
            }
            $user->setSocialLinks($socialLinks);
        }

        // Processa roles JSON
        $roles = json_decode($data['roles'], true);
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($roles)) {
            return $this->json(
                ['message' => 'Formato inválido para roles.'],
                Response::HTTP_BAD_REQUEST,
                ['Access-Control-Allow-Origin' => $allowedOrigin]
            );
        }
        $user->setRoles($roles);

        // Hash da senha
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        // Upload de foto, se houver
        if ($file) {
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/photos';

            // Tenta criar diretório se não existir
            if (!file_exists($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
                return $this->json(
                    ['message' => 'Falha ao criar diretório de upload.'],
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    ['Access-Control-Allow-Origin' => $allowedOrigin]
                );
            }

            $filename = uniqid('', true) . '.' . $file->guessExtension();
            try {
                $file->move($uploadDir, $filename);
                $user->setPhoto('/uploads/photos/' . $filename);
            } catch (\Exception $e) {
                return $this->json(
                    ['message' => 'Falha ao salvar o arquivo: ' . $e->getMessage()],
                    Response::HTTP_INTERNAL_SERVER_ERROR,
                    ['Access-Control-Allow-Origin' => $allowedOrigin]
                );
            }
        }

        // Validação dos dados do usuário
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
            return $this->json(
                $errorMessages,
                Response::HTTP_BAD_REQUEST,
                ['Access-Control-Allow-Origin' => $allowedOrigin]
            );
        }

        // Persiste e salva no banco com tratamento de exceção
        try {
            $em->persist($user);
            $em->flush();
        } catch (\Exception $e) {
            return $this->json(
                ['message' => 'Erro ao salvar usuário: ' . $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR,
                ['Access-Control-Allow-Origin' => $allowedOrigin]
            );
        }

        // Retorno sucesso com CORS
        return $this->json(
            [
                'message' => 'Usuário registrado com sucesso!',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    'photo' => $user->getPhoto(),
                    'roles' => $user->getRoles(),
                ],
            ],
            Response::HTTP_CREATED,
            ['Access-Control-Allow-Origin' => $allowedOrigin]
        );
    }
}
