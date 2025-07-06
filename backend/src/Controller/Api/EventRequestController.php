<?php

namespace App\Controller\Api;

use App\Entity\EventRequest;
use App\Repository\EventRepository;
use App\Repository\UserRepository;
use App\Repository\EventRequestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/event-requests', name: 'api_event_requests_')]
class EventRequestController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private EventRequestRepository $requestRepository,
        private EventRepository $eventRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $requests = $this->requestRepository->findAll();

        $data = array_map(fn(EventRequest $r) => [
            'id' => $r->getId(),
            'event_id' => $r->getEvent()->getId(),
            'artist_id' => $r->getArtist()->getId(),
            'status' => $r->getStatus(),
            'createdAt' => $r->getCreatedAt()->format('c'),
        ], $requests);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $request = $this->requestRepository->find($id);
        if (!$request) {
            return $this->json(['error' => 'Request not found'], 404);
        }

        return $this->json([
            'id' => $request->getId(),
            'event_id' => $request->getEvent()->getId(),
            'artist_id' => $request->getArtist()->getId(),
            'status' => $request->getStatus(),
            'createdAt' => $request->getCreatedAt()->format('c'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['event_id'], $data['artist_id'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $event = $this->eventRepository->find($data['event_id']);
        $artist = $this->userRepository->find($data['artist_id']);
        if (!$event || !$artist) {
            return $this->json(['error' => 'Event or Artist not found'], 404);
        }

        $eventRequest = new EventRequest();
        $eventRequest->setEvent($event);
        $eventRequest->setArtist($artist);

        $this->em->persist($eventRequest);
        $this->em->flush();

        return $this->json(['message' => 'Request created', 'id' => $eventRequest->getId()], 201);
    }

    #[Route('/{id}/status', name: 'update_status', methods: ['PUT'])]
    public function updateStatus(int $id, Request $request): JsonResponse
    {
        $eventRequest = $this->requestRepository->find($id);
        if (!$eventRequest) {
            return $this->json(['error' => 'Request not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['status'])) {
            return $this->json(['error' => 'Missing status field'], 400);
        }

        $validStatuses = ['pending', 'accepted', 'rejected'];
        if (!in_array($data['status'], $validStatuses, true)) {
            return $this->json(['error' => 'Invalid status'], 400);
        }

        $eventRequest->setStatus($data['status']);
        $this->em->flush();

        return $this->json(['message' => 'Status updated']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $eventRequest = $this->requestRepository->find($id);
        if (!$eventRequest) {
            return $this->json(['error' => 'Request not found'], 404);
        }

        $this->em->remove($eventRequest);
        $this->em->flush();

        return $this->json(['message' => 'Request deleted']);
    }
}
