<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Artista
        $artist = new User();
        $artist->setEmail('artist@example.com');
        $artist->setRoles(['ROLE_ARTIST']);
        $artist->setPassword($this->passwordHasher->hashPassword($artist, 'artist123'));
        $manager->persist($artist);

        // Estabelecimento
        $venue = new User();
        $venue->setEmail('venue@example.com');
        $venue->setRoles(['ROLE_VENUE']);
        $venue->setPassword($this->passwordHasher->hashPassword($venue, 'venue123'));
        $manager->persist($venue);

        // Fã
        $fan = new User();
        $fan->setEmail('fan@example.com');
        $fan->setRoles(['ROLE_FAN']);
        $fan->setPassword($this->passwordHasher->hashPassword($fan, 'fan123'));
        $manager->persist($fan);

        $manager->flush();
    }
}
