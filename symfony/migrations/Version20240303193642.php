<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240303193642 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        // $this->addSql('DROP TABLE sessions');
        $this->addSql('ALTER TABLE Article ADD is_approved TINYINT(1) NOT NULL, ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', DROP isApproved, DROP createdAt, DROP updatedAt, CHANGE description description LONGTEXT NOT NULL, CHANGE image image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE Article RENAME INDEX fk_user TO IDX_23A0E6664B64DCC');
        $this->addSql('ALTER TABLE User CHANGE role role VARCHAR(255) NOT NULL, CHANGE email email VARCHAR(255) NOT NULL, CHANGE password password LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE User RENAME INDEX nom TO UNIQ_8D93D6496C6E55B5');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // $this->addSql('CREATE TABLE sessions (session_id VARCHAR(128) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, expires INT UNSIGNED NOT NULL, data MEDIUMTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_bin`, PRIMARY KEY(session_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('ALTER TABLE article ADD isApproved TINYINT(1) DEFAULT 0 NOT NULL, ADD createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, ADD updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, DROP is_approved, DROP created_at, DROP updated_at, CHANGE description description TEXT NOT NULL, CHANGE image image VARCHAR(255) DEFAULT \'storage/default2.png\'');
        $this->addSql('ALTER TABLE article RENAME INDEX idx_23a0e6664b64dcc TO fk_user');
        $this->addSql('ALTER TABLE user CHANGE role role VARCHAR(255) DEFAULT \'Basic\' NOT NULL, CHANGE email email TEXT NOT NULL, CHANGE password password TEXT NOT NULL');
        $this->addSql('ALTER TABLE user RENAME INDEX uniq_8d93d6496c6e55b5 TO nom');
    }
}
