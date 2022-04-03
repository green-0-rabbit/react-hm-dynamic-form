## Project Requirement

### Git
> 1. [x] git repo initialized
> 2. [x] remote branche 'origin' preferred
> 3. [x] git pack-refs
> 4. [x] .git/index updated

### Project settings
> 1. [x] rootpath
> 2. [x] all dependencies installed (check package.json)
> 3. [x] git pack-refs

## Git errors


| error    | Solution |
| --------- | ----------- |
| fatal: index file smaller than expected (index is empty)    | rm .git/index , then git reset HEAD     |
| git//packed-refs if doesn't exis | git pack-refs       |

- @see more ./git//packed-refs if doesn't exist issue <git pack-refs> in terminal @see https://github.com/creationix/node-git/issues/1
- @see git/index  https://jamesgordo.com/fix-git-fatal-index-file-smaller/