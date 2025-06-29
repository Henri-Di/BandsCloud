<?php
namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\EventRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/comments', name: 'api_comments_')]
class CommentController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private CommentRepository $commentRepository,
        private EventRepository $eventRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $comments = $this->commentRepository->findAll();

        $data = array_map(fn(Comment $c) => [
            'id' => $c->getId(),
            'event_id' => $c->getEvent()->getId(),
            'user_id' => $c->getUser()->getId(),
            'content' => $c->getContent(),
            'createdAt' => $c->getCreatedAt()->format('c'),
        ], $comments);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $comment = $this->commentRepository->find($id);
        if (!$comment) {
            return $this->json(['error' => 'Comment not found'], 404);
        }

        return $this->json([
            'id' => $comment->getId(),
            'event_id' => $comment->getEvent()->getId(),
            'user_id' => $comment->getUser()->getId(),
            'content' => $comment->getContent(),
            'createdAt' => $comment->getCreatedAt()->format('c'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['event_id'], $data['user_id'], $data['content'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $event = $this->eventRepository->find($data['event_id']);
        $user = $this->userRepository->find($data['user_id']);

        if (!$event || !$user) {
            return $this->json(['error' => 'Event or User not found'], 404);
        }

        $comment = new Comment();
        $comment->setEvent($event);
        $comment->setUser($user);
        $comment->setContent($data['content']);

        $this->em->persist($comment);
        $this->em->flush();

        return $this->json(['message' => 'Comment created', 'id' => $comment->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $comment = $this->commentRepository->find($id);
        if (!$comment) {
            return $this->json(['error' => 'Comment not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['content'])) {
            $comment->setContent($data['content']);
        }

        $this->em->flush();

        return $this->json(['message' => 'Comment updated']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $comment = $this->commentRepository->find($id);
        if (!$comment) {
            return $this->json(['error' => 'Comment not found'], 404);
        }

        $this->em->remove($comment);
        $this->em->flush();

        return $this->json(['message' => 'Comment deleted']);
    }
}
