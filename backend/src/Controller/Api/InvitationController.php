<?php

namespace App\Controller\Api;

use App\Entity\Invitation;
use App\Repository\InvitationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/invitations')]
class InvitationController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly InvitationRepository $invitationRepository,
        private readonly UserRepository $userRepository,
        private readonly SerializerInterface $serializer,
    ) {}

    #[Route('', name: 'invitation_list', methods: ['GET'])]
    public function list(): Response
    {
        $invitations = $this->invitationRepository->findAll();

        $json = $this->serializer->serialize($invitations, 'json', ['groups' => ['invitation:list']]);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}', name: 'invitation_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $invitation = $this->invitationRepository->find($id);

        if (!$invitation) {
            return $this->json(['error' => 'Invitation not found'], 404);
        }

        $json = $this->serializer->serialize($invitation, 'json', ['groups' => ['invitation:item']]);

        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('', name: 'invitation_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || empty($data['venueId']) || empty($data['artistId'])) {
            return $this->json(['error' => 'venueId and artistId are required'], 400);
        }

        $venue = $this->userRepository->find($data['venueId']);
        $artist = $this->userRepository->find($data['artistId']);

        if (!$venue || !$artist) {
            return $this->json(['error' => 'Venue or Artist not found'], 404);
        }

        $invitation = new Invitation();
        $invitation->setVenue($venue);
        $invitation->setArtist($artist);

        if (!empty($data['status'])) {
            try {
                $invitation->setStatus($data['status']);
            } catch (\InvalidArgumentException $e) {
                return $this->json(['error' => $e->getMessage()], 400);
            }
        }

        $this->em->persist($invitation);
        $this->em->flush();

        $json = $this->serializer->serialize($invitation, 'json', ['groups' => ['invitation:item']]);

        return new Response($json, 201, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}', name: 'invitation_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $invitation = $this->invitationRepository->find($id);

        if (!$invitation) {
            return $this->json(['error' => 'Invitation not found'], 404);
        }

        $this->em->remove($invitation);
        $this->em->flush();

        return $this->json(null, 204);
    }
}
