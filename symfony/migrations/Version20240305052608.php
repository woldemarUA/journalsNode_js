<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240305052608 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs


        $this->addSql('ALTER TABLE Article CHANGE image image VARCHAR(255) DEFAULT NULL, CHANGE is_approved is_approved TINYINT(1) DEFAULT 0, CHANGE created_at created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE Article RENAME INDEX idx_23a0e6664b64dcc TO IDX_CD8737FA64B64DCC');
        $this->addSql('ALTER TABLE User ADD roles JSON NOT NULL, CHANGE nom nom VARCHAR(180) NOT NULL, CHANGE role role VARCHAR(255) DEFAULT \'Basic\', CHANGE password password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE User RENAME INDEX uniq_8d93d6496c6e55b5 TO UNIQ_2DA179776C6E55B5');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs


        $this->addSql('ALTER TABLE Article CHANGE image image VARCHAR(255) DEFAULT \'storage/default2.png\', CHANGE is_approved is_approved TINYINT(1) DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE Article RENAME INDEX idx_cd8737fa64b64dcc TO IDX_23A0E6664B64DCC');
        $this->addSql('ALTER TABLE User DROP roles, CHANGE nom nom VARCHAR(255) NOT NULL, CHANGE role role VARCHAR(255) NOT NULL, CHANGE password password LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE User RENAME INDEX uniq_2da179776c6e55b5 TO UNIQ_8D93D6496C6E55B5');
    }
}
