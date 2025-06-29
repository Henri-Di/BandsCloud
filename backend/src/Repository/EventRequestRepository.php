<?php
namespace App\Repository;

use App\Entity\EventRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class EventRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EventRequest::class);
    }

    /**
     * Buscar por artista
     */
    public function findByArtist(int $artistId): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.artist = :artistId')
            ->setParameter('artistId', $artistId)
            ->orderBy('r.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Buscar por evento
     */
    public function findByEvent(int $eventId): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.event = :eventId')
            ->setParameter('eventId', $eventId)
            ->orderBy('r.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
