<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\User;

#[ORM\Entity(repositoryClass: "App\Repository\MusicRepository")]
#[ORM\Table(name: "music")]
#[ApiResource(
    normalizationContext: ['groups' => ['music:list', 'music:item']],
    denormalizationContext: ['groups' => ['music:write']],
    operations: [
        new GetCollection(), // GET /music
        new Get(),           // GET /music/{id}
        new Post(),          // POST /music
        new Put(),           // PUT /music/{id}
        new Delete(),        // DELETE /music/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class Music
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: "integer")]
    #[Groups(['music:list', 'music:item', 'playlist:list', 'playlist:item'])]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(['music:list', 'music:item', 'music:write', 'playlist:list', 'playlist:item'])]
    private string $title;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(['music:list', 'music:item', 'music:write', 'playlist:list', 'playlist:item'])]
    private string $url;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['music:list', 'music:item', 'music:write', 'playlist:list', 'playlist:item'])]
    private ?string $tags = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['music:list', 'music:item', 'music:write', 'playlist:list', 'playlist:item'])]
    private User $artist;

    #[ORM\Column(type: "datetime")]
    #[Groups(['music:list', 'music:item', 'playlist:list', 'playlist:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;
        return $this;
    }

    public function getTags(): ?string
    {
        return $this->tags;
    }

    public function setTags(?string $tags): self
    {
        $this->tags = $tags;
        return $this;
    }

    public function getArtist(): User
    {
        return $this->artist;
    }

    public function setArtist(User $artist): self
    {
        $this->artist = $artist;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}
