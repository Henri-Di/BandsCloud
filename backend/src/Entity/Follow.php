<?php

namespace App\Entity;

use App\Repository\FollowRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FollowRepository::class)]
#[ORM\Table(name: "follows")]
class Follow
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    /**
     * Usuário que está seguindo (follower).
     */
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "followsFollowing")]
    #[ORM\JoinColumn(nullable: false)]
    private User $follower;

    /**
     * Usuário que está sendo seguido (following).
     */
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "followsFollowers")]
    #[ORM\JoinColumn(nullable: false)]
    private User $following;

    /**
     * Data em que o follow foi criado.
     */
    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $followedAt;

    public function __construct(User $follower, User $following)
    {
        $this->follower = $follower;
        $this->following = $following;
        $this->followedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFollower(): User
    {
        return $this->follower;
    }

    public function setFollower(User $follower): self
    {
        $this->follower = $follower;
        return $this;
    }

    public function getFollowing(): User
    {
        return $this->following;
    }

    public function setFollowing(User $following): self
    {
        $this->following = $following;
        return $this;
    }

    public function getFollowedAt(): \DateTimeInterface
    {
        return $this->followedAt;
    }

    public function setFollowedAt(\DateTimeInterface $followedAt): self
    {
        $this->followedAt = $followedAt;
        return $this;
    }
}
