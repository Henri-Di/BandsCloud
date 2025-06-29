<?php
namespace App\Repository;

use App\Entity\Review;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Review::class);
    }

    /**
     * Retorna todas as avaliações de um evento
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

    /**
     * Retorna todas as avaliações feitas por um fã
     */
    public function findByFan(int $fanId): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.fan = :fanId')
            ->setParameter('fanId', $fanId)
            ->orderBy('r.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Retorna a média de avaliação de um evento
     */
    public function getAverageRatingByEvent(int $eventId): ?float
    {
        return $this->createQueryBuilder('r')
            ->select('AVG(r.rating)')
            ->andWhere('r.event = :eventId')
            ->setParameter('eventId', $eventId)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
