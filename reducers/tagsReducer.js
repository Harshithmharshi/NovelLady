
import {
    GET_CAROUSEL_TAG_START,
    GET_LISTING_TAG_START,
    GET_CAROUSEL_TAG,
    GET_CAROUSEL_TAG_FAILURE,
    GET_LISTING_TAG,
    GET_LISTING_TAG_FAILURE
} from '../actions/types';

const initialState = {
    carouselTag: [],
    lisitingTag: [],
    message: '',
    iscarouselTagLoad: false,
    islisitingTagLoad: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CAROUSEL_TAG_START:
            return {
                ...state,
                iscarouselTagLoad: false,
            }
            break;
            case GET_LISTING_TAG_START:
                return {
                    ...state,
                    islisitingTagLoad: false,
                }
                break;
        case GET_CAROUSEL_TAG:
            return {
                ...state,
                iscarouselTagLoad: true,
                carouselTag: action.payload,
            }
            break;
        case GET_LISTING_TAG:
            return {
                ...state,
                islisitingTagLoad: true,
                lisitingTag: action.payload
            }
            break;
        case GET_CAROUSEL_TAG_FAILURE:
            return {
                message: 'There was a problem while connecting to the server',
            }
            break;

        case GET_LISTING_TAG_FAILURE:
            return {
                message: 'There was a problem while connecting to the server'
            }

        default:
            return state;
    }
}