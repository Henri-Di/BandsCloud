<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 *
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    /**
     * Busca as mensagens enviadas por um dado usuário.
     * @return Message[]
     */
    public function findSentMessagesByUser(int $userId): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.sender = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('m.sentAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Busca as mensagens recebidas por um dado usuário.
     * @return Message[]
     */
    public function findReceivedMessagesByUser(int $userId): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.recipient = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('m.sentAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
