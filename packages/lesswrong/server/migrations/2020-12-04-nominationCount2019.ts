import { registerMigration, fillDefaultValues } from './migrationUtils';
import { Posts } from '../../lib/collections/posts/collection';
import { recomputeDenormalizedValues } from '../scripts/recomputeDenormalized';

registerMigration({
  name: "nominationCount2019",
  dateWritten: "2020-12-04",
  idempotent: true,
  action: async () => {
    await recomputeDenormalizedValues({collectionName: "Posts", fieldName: "nominationCount2019"});
  }
})
