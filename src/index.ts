#!/usr/bin/env node
import bootstrap from "./commands";
import { resAsync } from "./utils";

resAsync(async () => {
  const program = bootstrap();
  await program.parseAsync();
  process.exit(0);
});
