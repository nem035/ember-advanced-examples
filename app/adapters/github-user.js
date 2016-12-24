import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import GitHubUserAdapter from 'ember-data-github/adapters/github-user';

export default GitHubUserAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:github'
});
