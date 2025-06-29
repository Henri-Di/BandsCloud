<?php
namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }

    /**
     * Exemplo: Buscar eventos por artista
     * @param int $artistId
     * @return Event[]
     */
    public function findByArtist(int $artistId): array
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.artist = :artistId')
            ->setParameter('artistId', $artistId)
            ->orderBy('e.startDate', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Buscar eventos futuros
     * @return Event[]
     */
    public function findUpcoming(): array
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.startDate > :now')
            ->setParameter('now', new \DateTime())
            ->orderBy('e.startDate', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
