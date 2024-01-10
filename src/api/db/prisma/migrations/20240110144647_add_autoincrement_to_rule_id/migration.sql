-- AlterTable
CREATE SEQUENCE notification_rules_rule_id_seq;
ALTER TABLE "notification_rules" ALTER COLUMN "rule_id" SET DEFAULT nextval('notification_rules_rule_id_seq');
ALTER SEQUENCE notification_rules_rule_id_seq OWNED BY "notification_rules"."rule_id";
