import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const tweetValidation = createValidator({
  tweetContent: [required, maxLength(113)] // 140 - 15 (max length of handle) - 12 (length of clickoc hashtag)
});
export default memoize(10)(tweetValidation);
