<?php

namespace App\Repository;

use App\Entity\Playlist;
use App\Entity\User;
use App\Entity\Music;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Playlist>
 *
 * @method Playlist|null find($id, $lockMode = null, $lockVersion = null)
 * @method Playlist|null findOneBy(array $criteria, array $orderBy = null)
 * @method Playlist[]    findAll()
 * @method Playlist[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlaylistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Playlist::class);
    }

    /**
     * Busca todas as playlists de um determinado usuário.
     */
    public function findByUser(User $user): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.owner = :user')
            ->setParameter('user', $user)
            ->orderBy('p.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Busca playlists que contenham uma determinada música.
     */
    public function findByMusic(Music $music): array
    {
        return $this->createQueryBuilder('p')
            ->join('p.musics', 'm')
            ->andWhere('m = :music')
            ->setParameter('music', $music)
            ->getQuery()
            ->getResult();
    }

    /**
     * Busca playlists por nome (parcial, case insensitive).
     */
    public function findByName(string $name): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('LOWER(p.name) LIKE :name')
            ->setParameter('name', '%' . strtolower($name) . '%')
            ->orderBy('p.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Busca personalizada com múltiplos filtros opcionais.
     */
    public function search(?User $user = null, ?string $name = null, ?Music $music = null): array
    {
        $qb = $this->createQueryBuilder('p');

        if ($user) {
            $qb->andWhere('p.owner = :user')
               ->setParameter('user', $user);
        }

        if ($name) {
            $qb->andWhere('LOWER(p.name) LIKE :name')
               ->setParameter('name', '%' . strtolower($name) . '%');
        }

        if ($music) {
            $qb->join('p.musics', 'm')
               ->andWhere('m = :music')
               ->setParameter('music', $music);
        }

        $qb->orderBy('p.createdAt', 'DESC');

        return $qb->getQuery()->getResult();
    }
}
