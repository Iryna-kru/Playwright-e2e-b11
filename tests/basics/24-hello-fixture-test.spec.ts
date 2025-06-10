import { test } from '../../Fixtures/hello';

test('Testing My Custom Fixture', async({ hello }) => {
  console.log(hello);
});
