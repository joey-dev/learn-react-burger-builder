import React from 'react';

import * as actionTypes from '../actions/actionTypes';
import authReducer from './auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should store token when login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'some-user-id',
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });
});
