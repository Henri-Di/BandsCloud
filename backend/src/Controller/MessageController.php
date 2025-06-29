<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/messages')]
class MessageController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private MessageRepository $messageRepository,
    ) {}

    #[Route('', name: 'message_index', methods: ['GET'])]
    public function index(): Response
    {
        $messages = $this->messageRepository->findAll();
        return $this->json($messages, 200, [], ['groups' => ['message']]);
    }

    #[Route('/{id}', name: 'message_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $message = $this->messageRepository->find($id);
        if (!$message) {
            return $this->json(['error' => 'Mensagem não encontrada'], 404);
        }
        return $this->json($message, 200, [], ['groups' => ['message']]);
    }

    #[Route('/sent/{userId}', name: 'message_sent', methods: ['GET'])]
    public function sentMessages(int $userId): Response
    {
        $messages = $this->messageRepository->findSentMessagesByUser($userId);
        return $this->json($messages, 200, [], ['groups' => ['message']]);
    }

    #[Route('/received/{userId}', name: 'message_received', methods: ['GET'])]
    public function receivedMessages(int $userId): Response
    {
        $messages = $this->messageRepository->findReceivedMessagesByUser($userId);
        return $this->json($messages, 200, [], ['groups' => ['message']]);
    }

    #[Route('', name: 'message_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['senderId']) || empty($data['recipientId']) || empty($data['content'])) {
            return $this->json(['error' => 'Campos senderId, recipientId e content são obrigatórios'], 400);
        }

        $sender = $this->em->getRepository(User::class)->find($data['senderId']);
        $recipient = $this->em->getRepository(User::class)->find($data['recipientId']);

        if (!$sender || !$recipient) {
            return $this->json(['error' => 'Usuário remetente ou destinatário não encontrado'], 404);
        }

        $message = new Message();
        $message->setSender($sender);
        $message->setRecipient($recipient);
        $message->setContent($data['content']);

        $this->em->persist($message);
        $this->em->flush();

        return $this->json($message, 201, [], ['groups' => ['message']]);
    }

    #[Route('/{id}', name: 'message_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $message = $this->messageRepository->find($id);

        if (!$message) {
            return $this->json(['error' => 'Mensagem não encontrada'], 404);
        }

        $this->em->remove($message);
        $this->em->flush();

        return $this->json(['message' => 'Mensagem removida com sucesso'], 200);
    }
}
