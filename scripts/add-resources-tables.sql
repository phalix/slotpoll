-- Create resources table (global resource catalog)
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT,
  "totalQuantity" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create slot_resources join table
CREATE TABLE IF NOT EXISTS slot_resources (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "slotId" TEXT NOT NULL REFERENCES slots(id) ON DELETE CASCADE,
  "resourceId" TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1
);

-- Add indexes for efficient conflict detection queries
CREATE INDEX IF NOT EXISTS idx_slot_resources_slot_id ON slot_resources("slotId");
CREATE INDEX IF NOT EXISTS idx_slot_resources_resource_id ON slot_resources("resourceId");
