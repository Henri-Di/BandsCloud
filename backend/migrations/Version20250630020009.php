<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250630020009 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, event_id INT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_5F9E962AA76ED395 (user_id), INDEX IDX_5F9E962A71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_requests (id INT AUTO_INCREMENT NOT NULL, event_id INT NOT NULL, artist_id INT NOT NULL, status VARCHAR(20) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3D693F8171F7E88B (event_id), INDEX IDX_3D693F81B7970CF8 (artist_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE events (id INT AUTO_INCREMENT NOT NULL, artist_id INT NOT NULL, venue_id INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, start_date DATETIME NOT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_5387574AB7970CF8 (artist_id), INDEX IDX_5387574A40A73EBA (venue_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE follows (id INT AUTO_INCREMENT NOT NULL, follower_id INT NOT NULL, following_id INT NOT NULL, followed_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_4B638A73AC24F853 (follower_id), INDEX IDX_4B638A731816E3A3 (following_id), UNIQUE INDEX unique_follower_following (follower_id, following_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE invitations (id INT AUTO_INCREMENT NOT NULL, venue_id INT NOT NULL, artist_id INT NOT NULL, status VARCHAR(20) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_232710AE40A73EBA (venue_id), INDEX IDX_232710AEB7970CF8 (artist_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, sender_id INT NOT NULL, recipient_id INT NOT NULL, content LONGTEXT NOT NULL, sent_at DATETIME NOT NULL, INDEX IDX_DB021E96F624B39D (sender_id), INDEX IDX_DB021E96E92F8F78 (recipient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE music (id INT AUTO_INCREMENT NOT NULL, artist_id INT NOT NULL, title VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, tags VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_CD52224AB7970CF8 (artist_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE playlists (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_5E06116F7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE playlist_music (playlist_id INT NOT NULL, music_id INT NOT NULL, INDEX IDX_6E4E3B096BBD148 (playlist_id), INDEX IDX_6E4E3B09399BBB13 (music_id), PRIMARY KEY(playlist_id, music_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reviews (id INT AUTO_INCREMENT NOT NULL, fan_id INT NOT NULL, event_id INT NOT NULL, rating INT NOT NULL, comment LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_6970EB0F89C48F0B (fan_id), INDEX IDX_6970EB0F71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(100) DEFAULT NULL, bio LONGTEXT DEFAULT NULL, photo VARCHAR(255) DEFAULT NULL, social_links JSON DEFAULT NULL, created_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_1483A5E9E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A71F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
        $this->addSql('ALTER TABLE event_requests ADD CONSTRAINT FK_3D693F8171F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
        $this->addSql('ALTER TABLE event_requests ADD CONSTRAINT FK_3D693F81B7970CF8 FOREIGN KEY (artist_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE events ADD CONSTRAINT FK_5387574AB7970CF8 FOREIGN KEY (artist_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE events ADD CONSTRAINT FK_5387574A40A73EBA FOREIGN KEY (venue_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE follows ADD CONSTRAINT FK_4B638A73AC24F853 FOREIGN KEY (follower_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE follows ADD CONSTRAINT FK_4B638A731816E3A3 FOREIGN KEY (following_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE invitations ADD CONSTRAINT FK_232710AE40A73EBA FOREIGN KEY (venue_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE invitations ADD CONSTRAINT FK_232710AEB7970CF8 FOREIGN KEY (artist_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96F624B39D FOREIGN KEY (sender_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96E92F8F78 FOREIGN KEY (recipient_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE music ADD CONSTRAINT FK_CD52224AB7970CF8 FOREIGN KEY (artist_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE playlists ADD CONSTRAINT FK_5E06116F7E3C61F9 FOREIGN KEY (owner_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE playlist_music ADD CONSTRAINT FK_6E4E3B096BBD148 FOREIGN KEY (playlist_id) REFERENCES playlists (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE playlist_music ADD CONSTRAINT FK_6E4E3B09399BBB13 FOREIGN KEY (music_id) REFERENCES music (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0F89C48F0B FOREIGN KEY (fan_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0F71F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962AA76ED395');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A71F7E88B');
        $this->addSql('ALTER TABLE event_requests DROP FOREIGN KEY FK_3D693F8171F7E88B');
        $this->addSql('ALTER TABLE event_requests DROP FOREIGN KEY FK_3D693F81B7970CF8');
        $this->addSql('ALTER TABLE events DROP FOREIGN KEY FK_5387574AB7970CF8');
        $this->addSql('ALTER TABLE events DROP FOREIGN KEY FK_5387574A40A73EBA');
        $this->addSql('ALTER TABLE follows DROP FOREIGN KEY FK_4B638A73AC24F853');
        $this->addSql('ALTER TABLE follows DROP FOREIGN KEY FK_4B638A731816E3A3');
        $this->addSql('ALTER TABLE invitations DROP FOREIGN KEY FK_232710AE40A73EBA');
        $this->addSql('ALTER TABLE invitations DROP FOREIGN KEY FK_232710AEB7970CF8');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96F624B39D');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96E92F8F78');
        $this->addSql('ALTER TABLE music DROP FOREIGN KEY FK_CD52224AB7970CF8');
        $this->addSql('ALTER TABLE playlists DROP FOREIGN KEY FK_5E06116F7E3C61F9');
        $this->addSql('ALTER TABLE playlist_music DROP FOREIGN KEY FK_6E4E3B096BBD148');
        $this->addSql('ALTER TABLE playlist_music DROP FOREIGN KEY FK_6E4E3B09399BBB13');
        $this->addSql('ALTER TABLE reviews DROP FOREIGN KEY FK_6970EB0F89C48F0B');
        $this->addSql('ALTER TABLE reviews DROP FOREIGN KEY FK_6970EB0F71F7E88B');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE event_requests');
        $this->addSql('DROP TABLE events');
        $this->addSql('DROP TABLE follows');
        $this->addSql('DROP TABLE invitations');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE music');
        $this->addSql('DROP TABLE playlists');
        $this->addSql('DROP TABLE playlist_music');
        $this->addSql('DROP TABLE reviews');
        $this->addSql('DROP TABLE users');
    }
}
