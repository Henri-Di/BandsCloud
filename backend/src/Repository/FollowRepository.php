<?php

namespace App\Repository;

use App\Entity\Follow;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Follow>
 *
 * @method Follow|null find($id, $lockMode = null, $lockVersion = null)
 * @method Follow|null findOneBy(array $criteria, array $orderBy = null)
 * @method Follow[]    findAll()
 * @method Follow[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FollowRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Follow::class);
    }

    /**
     * Retorna todos os follows onde $user é o seguidor (follower).
     *
     * @param User $user
     * @return Follow[]
     */
    public function findByFollower(User $user): array
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.follower = :user')
            ->setParameter('user', $user)
            ->orderBy('f.followedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Retorna todos os follows onde $user é seguido (following).
     *
     * @param User $user
     * @return Follow[]
     */
    public function findByFollowing(User $user): array
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.following = :user')
            ->setParameter('user', $user)
            ->orderBy('f.followedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
