<?php

namespace App\Controller\Api;

use App\Entity\Review;
use App\Repository\ReviewRepository;
use App\Repository\EventRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/reviews', name: 'api_reviews_')]
class ReviewController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private ReviewRepository $reviewRepository,
        private EventRepository $eventRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $reviews = $this->reviewRepository->findAll();

        $data = array_map(fn(Review $r) => [
            'id' => $r->getId(),
            'event_id' => $r->getEvent()->getId(),
            'fan_id' => $r->getFan()->getId(),
            'rating' => $r->getRating(),
            'comment' => $r->getComment(),
            'createdAt' => $r->getCreatedAt()->format('c'),
        ], $reviews);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $review = $this->reviewRepository->find($id);
        if (!$review) {
            return $this->json(['error' => 'Review not found'], 404);
        }

        return $this->json([
            'id' => $review->getId(),
            'event_id' => $review->getEvent()->getId(),
            'fan_id' => $review->getFan()->getId(),
            'rating' => $review->getRating(),
            'comment' => $review->getComment(),
            'createdAt' => $review->getCreatedAt()->format('c'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['event_id'], $data['fan_id'], $data['rating'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $event = $this->eventRepository->find($data['event_id']);
        $fan = $this->userRepository->find($data['fan_id']);

        if (!$event || !$fan) {
            return $this->json(['error' => 'Event or Fan not found'], 404);
        }

        try {
            $review = new Review();
            $review->setEvent($event);
            $review->setFan($fan);
            $review->setRating((int)$data['rating']);
            $review->setComment($data['comment'] ?? null);

            $this->em->persist($review);
            $this->em->flush();

            return $this->json(['message' => 'Review created', 'id' => $review->getId()], 201);
        } catch (\InvalidArgumentException $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $review = $this->reviewRepository->find($id);
        if (!$review) {
            return $this->json(['error' => 'Review not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        try {
            if (isset($data['rating'])) {
                $review->setRating((int)$data['rating']);
            }
            if (array_key_exists('comment', $data)) {
                $review->setComment($data['comment']);
            }

            $this->em->flush();

            return $this->json(['message' => 'Review updated']);
        } catch (\InvalidArgumentException $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $review = $this->reviewRepository->find($id);
        if (!$review) {
            return $this->json(['error' => 'Review not found'], 404);
        }

        $this->em->remove($review);
        $this->em->flush();

        return $this->json(['message' => 'Review deleted']);
    }
}
