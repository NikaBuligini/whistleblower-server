#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import Schema from '../app/graph';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await graphql(Schema, introspectionQuery);
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2),
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../app/graph/schema.json'),
      JSON.stringify(result, null, 2),
    );
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../app/graph/schema.graphql'),
  printSchema(Schema),
);
