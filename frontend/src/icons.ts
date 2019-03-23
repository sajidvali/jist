import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faPinterestP, faRedditAlien, faTumblr, 
  faWhatsapp, faFacebookMessenger, faTelegramPlane, faEnvelope, faCommentAlt, faEllipsisH, faMinus
];

library.add(...icons);