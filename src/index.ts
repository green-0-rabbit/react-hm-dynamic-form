#!/usr/bin/env node
import { resAsync } from "@/utils";
import bootstrap from "./cli/commands";

resAsync(async () => {
  const program = bootstrap();
  await program.parseAsync();
  process.exit(0);
});
