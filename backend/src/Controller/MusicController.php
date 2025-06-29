<?php
namespace App\Controller;

use App\Entity\Music;
use App\Repository\MusicRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/music', name: 'api_music_')]
class MusicController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private MusicRepository $musicRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $musicList = $this->musicRepository->findAll();

        $data = array_map(fn(Music $m) => [
            'id' => $m->getId(),
            'title' => $m->getTitle(),
            'url' => $m->getUrl(),
            'tags' => $m->getTags(),
            'artist_id' => $m->getArtist()->getId(),
            'createdAt' => $m->getCreatedAt()->format('c'),
        ], $musicList);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $music = $this->musicRepository->find($id);
        if (!$music) {
            return $this->json(['error' => 'Music not found'], 404);
        }

        return $this->json([
            'id' => $music->getId(),
            'title' => $music->getTitle(),
            'url' => $music->getUrl(),
            'tags' => $music->getTags(),
            'artist_id' => $music->getArtist()->getId(),
            'createdAt' => $music->getCreatedAt()->format('c'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['title'], $data['url'], $data['artist_id'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $artist = $this->userRepository->find($data['artist_id']);
        if (!$artist) {
            return $this->json(['error' => 'Artist not found'], 404);
        }

        $music = new Music();
        $music->setTitle($data['title']);
        $music->setUrl($data['url']);
        $music->setTags($data['tags'] ?? null);
        $music->setArtist($artist);

        $this->em->persist($music);
        $this->em->flush();

        return $this->json(['message' => 'Music created', 'id' => $music->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $music = $this->musicRepository->find($id);
        if (!$music) {
            return $this->json(['error' => 'Music not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['title'])) {
            $music->setTitle($data['title']);
        }
        if (isset($data['url'])) {
            $music->setUrl($data['url']);
        }
        if (array_key_exists('tags', $data)) {
            $music->setTags($data['tags']);
        }
        if (isset($data['artist_id'])) {
            $artist = $this->userRepository->find($data['artist_id']);
            if (!$artist) {
                return $this->json(['error' => 'Artist not found'], 404);
            }
            $music->setArtist($artist);
        }

        $this->em->flush();

        return $this->json(['message' => 'Music updated']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $music = $this->musicRepository->find($id);
        if (!$music) {
            return $this->json(['error' => 'Music not found'], 404);
        }

        $this->em->remove($music);
        $this->em->flush();

        return $this->json(['message' => 'Music deleted']);
    }
}
