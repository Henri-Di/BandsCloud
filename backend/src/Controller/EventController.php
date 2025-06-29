<?php
namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/events', name: 'api_events_')]
class EventController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private EventRepository $eventRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $events = $this->eventRepository->findAll();

        $data = array_map(fn(Event $e) => [
            'id' => $e->getId(),
            'artist_id' => $e->getArtist()->getId(),
            'venue_id' => $e->getVenue()->getId(),
            'title' => $e->getTitle(),
            'description' => $e->getDescription(),
            'startDate' => $e->getStartDate()->format('c'),
            'endDate' => $e->getEndDate()?->format('c'),
            'createdAt' => $e->getCreatedAt()->format('c'),
        ], $events);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $event = $this->eventRepository->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], 404);
        }

        return $this->json([
            'id' => $event->getId(),
            'artist_id' => $event->getArtist()->getId(),
            'venue_id' => $event->getVenue()->getId(),
            'title' => $event->getTitle(),
            'description' => $event->getDescription(),
            'startDate' => $event->getStartDate()->format('c'),
            'endDate' => $event->getEndDate()?->format('c'),
            'createdAt' => $event->getCreatedAt()->format('c'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!isset($payload['artist_id'], $payload['venue_id'], $payload['title'], $payload['startDate'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $artist = $this->userRepository->find($payload['artist_id']);
        $venue = $this->userRepository->find($payload['venue_id']);
        if (!$artist || !$venue) {
            return $this->json(['error' => 'Artist or Venue not found'], 404);
        }

        $event = new Event();
        $event->setArtist($artist);
        $event->setVenue($venue);
        $event->setTitle($payload['title']);
        $event->setDescription($payload['description'] ?? null);

        try {
            $event->setStartDate(new \DateTime($payload['startDate']));
            if (isset($payload['endDate'])) {
                $event->setEndDate(new \DateTime($payload['endDate']));
            }
        } catch (\Exception $e) {
            return $this->json(['error' => 'Invalid date format'], 400);
        }

        $this->em->persist($event);
        $this->em->flush();

        return $this->json(['message' => 'Event created', 'id' => $event->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $event = $this->eventRepository->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], 404);
        }

        $payload = json_decode($request->getContent(), true);

        if (isset($payload['title'])) {
            $event->setTitle($payload['title']);
        }
        if (array_key_exists('description', $payload)) {
            $event->setDescription($payload['description']);
        }
        if (isset($payload['artist_id'])) {
            $artist = $this->userRepository->find($payload['artist_id']);
            if (!$artist) {
                return $this->json(['error' => 'Artist not found'], 404);
            }
            $event->setArtist($artist);
        }
        if (isset($payload['venue_id'])) {
            $venue = $this->userRepository->find($payload['venue_id']);
            if (!$venue) {
                return $this->json(['error' => 'Venue not found'], 404);
            }
            $event->setVenue($venue);
        }
        if (isset($payload['startDate'])) {
            try {
                $event->setStartDate(new \DateTime($payload['startDate']));
            } catch (\Exception $e) {
                return $this->json(['error' => 'Invalid startDate format'], 400);
            }
        }
        if (array_key_exists('endDate', $payload)) {
            try {
                if ($payload['endDate'] === null) {
                    $event->setEndDate(null);
                } else {
                    $event->setEndDate(new \DateTime($payload['endDate']));
                }
            } catch (\Exception $e) {
                return $this->json(['error' => 'Invalid endDate format'], 400);
            }
        }

        $this->em->flush();

        return $this->json(['message' => 'Event updated']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $event = $this->eventRepository->find($id);
        if (!$event) {
            return $this->json(['error' => 'Event not found'], 404);
        }
        $this->em->remove($event);
        $this->em->flush();

        return $this->json(['message' => 'Event deleted']);
    }
}
