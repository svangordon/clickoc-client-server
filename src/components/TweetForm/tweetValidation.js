import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const tweetValidation = createValidator({
  tweetContent: [required, maxLength(125)] // 140 - 15 (max length of handle)
});
export default memoize(10)(tweetValidation);
