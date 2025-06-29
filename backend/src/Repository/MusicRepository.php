<?php
namespace App\Repository;

use App\Entity\Music;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MusicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Music::class);
    }

    /**
     * Buscar músicas por artista
     */
    public function findByArtist(int $artistId): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.artist = :artistId')
            ->setParameter('artistId', $artistId)
            ->orderBy('m.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Buscar músicas por tag
     */
    public function findByTag(string $tag): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.tags LIKE :tag')
            ->setParameter('tag', '%' . $tag . '%')
            ->orderBy('m.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
