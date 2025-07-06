<?php

namespace App\Controller\Api;

use App\Entity\Playlist;
use App\Repository\PlaylistRepository;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/playlists')]
class PlaylistController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private PlaylistRepository $playlistRepository,
    ) {}

    #[Route('', name: 'playlist_index', methods: ['GET'])]
    public function index(): Response
    {
        $playlists = $this->playlistRepository->findAll();

        return $this->json($playlists, 200, [], ['groups' => ['playlist']]);
    }

    #[Route('/{id}', name: 'playlist_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $playlist = $this->playlistRepository->find($id);

        if (!$playlist) {
            return $this->json(['error' => 'Playlist não encontrada'], 404);
        }

        return $this->json($playlist, 200, [], ['groups' => ['playlist']]);
    }

    #[Route('', name: 'playlist_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['ownerId']) || empty($data['name'])) {
            return $this->json(['error' => 'Campos ownerId e name são obrigatórios'], 400);
        }

        /** @var User|null $owner */
        $owner = $this->em->getRepository(User::class)->find($data['ownerId']);

        if (!$owner) {
            return $this->json(['error' => 'Usuário dono não encontrado'], 404);
        }

        $playlist = new Playlist();
        $playlist->setOwner($owner);
        $playlist->setName($data['name']);

        // Aqui poderia adicionar músicas, se fornecidas:
        if (!empty($data['musicIds']) && is_array($data['musicIds'])) {
            foreach ($data['musicIds'] as $musicId) {
                $music = $this->em->getRepository('App\Entity\Music')->find($musicId);
                if ($music) {
                    $playlist->addMusic($music);
                }
            }
        }

        $this->em->persist($playlist);
        $this->em->flush();

        return $this->json($playlist, 201, [], ['groups' => ['playlist']]);
    }

    #[Route('/{id}', name: 'playlist_update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request): Response
    {
        $playlist = $this->playlistRepository->find($id);

        if (!$playlist) {
            return $this->json(['error' => 'Playlist não encontrada'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (!empty($data['name'])) {
            $playlist->setName($data['name']);
        }

        if (!empty($data['ownerId'])) {
            $owner = $this->em->getRepository(User::class)->find($data['ownerId']);
            if ($owner) {
                $playlist->setOwner($owner);
            }
        }

        if (isset($data['musicIds']) && is_array($data['musicIds'])) {
            // Atualiza lista de músicas (substitui)
            // Remove todas as músicas atuais
            foreach ($playlist->getMusics() as $music) {
                $playlist->removeMusic($music);
            }
            // Adiciona as novas
            foreach ($data['musicIds'] as $musicId) {
                $music = $this->em->getRepository('App\Entity\Music')->find($musicId);
                if ($music) {
                    $playlist->addMusic($music);
                }
            }
        }

        $this->em->flush();

        return $this->json($playlist, 200, [], ['groups' => ['playlist']]);
    }

    #[Route('/{id}', name: 'playlist_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $playlist = $this->playlistRepository->find($id);

        if (!$playlist) {
            return $this->json(['error' => 'Playlist não encontrada'], 404);
        }

        $this->em->remove($playlist);
        $this->em->flush();

        return $this->json(['message' => 'Playlist removida com sucesso'], 200);
    }
}
