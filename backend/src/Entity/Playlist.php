<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\PlaylistRepository;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
#[ORM\Table(name: "playlists")]
#[ApiResource(
    normalizationContext: ['groups' => ['playlist:list', 'playlist:item']],
    denormalizationContext: ['groups' => ['playlist:write']],
    operations: [
        new GetCollection(), // GET /playlists
        new Get(),           // GET /playlists/{id}
        new Post(),          // POST /playlists
        new Put(),           // PUT /playlists/{id}
        new Delete(),        // DELETE /playlists/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class Playlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['playlist:list', 'playlist:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "playlists")]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['playlist:list', 'playlist:item', 'playlist:write'])]
    private ?User $owner = null;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(['playlist:list', 'playlist:item', 'playlist:write'])]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Music::class)]
    #[ORM\JoinTable(name: "playlist_music")]
    #[Groups(['playlist:list', 'playlist:item', 'playlist:write'])]
    private Collection $musics;

    #[ORM\Column(type: "datetime_immutable")]
    #[Groups(['playlist:list', 'playlist:item'])]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->musics = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return Collection<int, Music>
     */
    public function getMusics(): Collection
    {
        return $this->musics;
    }

    public function addMusic(Music $music): self
    {
        if (!$this->musics->contains($music)) {
            $this->musics[] = $music;
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        $this->musics->removeElement($music);

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
