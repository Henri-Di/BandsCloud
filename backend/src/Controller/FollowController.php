<?php

namespace App\Controller;

use App\Entity\Follow;
use App\Entity\User;
use App\Repository\FollowRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

#[Route('/api/follows')]
class FollowController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private FollowRepository $followRepository,
        private UserRepository $userRepository,
        private Security $security
    ) {}

    #[Route('/following', name: 'list_following', methods: ['GET'])]
    public function listFollowing(): JsonResponse
    {
        /** @var User|null $currentUser */
        $currentUser = $this->security->getUser();

        if (!$currentUser instanceof User) {
            return $this->json(['error' => 'Usuário não autenticado.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // findByFollower deve retornar Collection ou array
        $follows = $this->followRepository->findByFollower($currentUser);

        // Caso retorne Collection, pode converter para array:
        if (is_object($follows) && method_exists($follows, 'toArray')) {
            $follows = $follows->toArray();
        }

        $followingUsers = array_map(fn(Follow $follow) => [
            'id' => $follow->getFollowing()->getId(),
            'username' => $follow->getFollowing()->getUserIdentifier(),
            'followedAt' => $follow->getFollowedAt()->format('c'),
        ], $follows);

        return $this->json($followingUsers);
    }

    #[Route('/followers', name: 'list_followers', methods: ['GET'])]
    public function listFollowers(): JsonResponse
    {
        /** @var User|null $currentUser */
        $currentUser = $this->security->getUser();

        if (!$currentUser instanceof User) {
            return $this->json(['error' => 'Usuário não autenticado.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $follows = $this->followRepository->findByFollowing($currentUser);

        if (is_object($follows) && method_exists($follows, 'toArray')) {
            $follows = $follows->toArray();
        }

        $followersUsers = array_map(fn(Follow $follow) => [
            'id' => $follow->getFollower()->getId(),
            'username' => $follow->getFollower()->getUserIdentifier(),
            'followedAt' => $follow->getFollowedAt()->format('c'),
        ], $follows);

        return $this->json($followersUsers);
    }
}
