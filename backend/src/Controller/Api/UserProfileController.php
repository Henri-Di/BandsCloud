<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user')]
class UserProfileController extends AbstractController
{
    #[Route('/profile', name: 'api_user_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof User) {
            return $this->json(['error' => 'Usuário não autenticado'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'bio' => $user->getBio(),
            'socialLinks' => $user->getSocialLinks(),
            'photo' => $user->getPhoto(),
        ]);
    }
}
