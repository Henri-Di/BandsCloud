<?php

namespace App\Repository;

use App\Entity\Follow;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

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
     * Retorna os follows onde o usuário é follower
     * 
     * @param User $follower
     * @return Collection|Follow[]
     */
    public function findByFollower(User $follower): Collection
    {
        $results = $this->createQueryBuilder('f')
            ->andWhere('f.follower = :follower')
            ->setParameter('follower', $follower)
            ->orderBy('f.followedAt', 'DESC')
            ->getQuery()
            ->getResult();

        return new ArrayCollection($results);
    }

    /**
     * Retorna os follows onde o usuário é following (ou seja, seguidores do usuário)
     * 
     * @param User $following
     * @return Collection|Follow[]
     */
    public function findByFollowing(User $following): Collection
    {
        $results = $this->createQueryBuilder('f')
            ->andWhere('f.following = :following')
            ->setParameter('following', $following)
            ->orderBy('f.followedAt', 'DESC')
            ->getQuery()
            ->getResult();

        return new ArrayCollection($results);
    }

    /**
     * Verifica se já existe um follow entre follower e following
     * 
     * @param User $follower
     * @param User $following
     * @return Follow|null
     */
    public function findFollow(User $follower, User $following): ?Follow
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.follower = :follower')
            ->andWhere('f.following = :following')
            ->setParameters([
                'follower' => $follower,
                'following' => $following,
            ])
            ->getQuery()
            ->getOneOrNullResult();
    }
}
