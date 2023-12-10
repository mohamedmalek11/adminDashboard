"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/@fake-db/auth/jwt.ts":
/*!**********************************!*\
  !*** ./src/@fake-db/auth/jwt.ts ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_fake_db_mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/@fake-db/mock */ \"./src/@fake-db/mock.ts\");\n/* harmony import */ var src_configs_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/configs/auth */ \"./src/configs/auth.ts\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"./node_modules/next/dist/build/polyfills/process.js\");\n// ** JWT import\n\n// ** Mock Adapter\n\n// ** Default AuthConfig\n\nconst users = [\n    {\n        id: 1,\n        role: \"admin\",\n        password: \"admin\",\n        fullName: \"John Doe\",\n        username: \"johndoe\",\n        email: \"admin@aerbag.com\"\n    },\n    {\n        id: 2,\n        role: \"client\",\n        password: \"client\",\n        fullName: \"Jane Doe\",\n        username: \"janedoe\",\n        email: \"client@vuexy.com\"\n    }\n];\n// ! These two secrets should be in .env file and not in any other file\nconst jwtConfig = {\n    secret: process.env.NEXT_PUBLIC_JWT_SECRET,\n    expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,\n    refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET\n};\nsrc_fake_db_mock__WEBPACK_IMPORTED_MODULE_1__[\"default\"].onPost(\"/jwt/login\").reply((request)=>{\n    const { email , password  } = JSON.parse(request.data);\n    let error = {\n        email: [\n            \"Something went wrong\"\n        ]\n    };\n    const user = users.find((u)=>u.email === email && u.password === password);\n    if (user) {\n        const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n            id: user.id\n        }, jwtConfig.secret, {\n            expiresIn: jwtConfig.expirationTime\n        });\n        const response = {\n            accessToken,\n            userData: {\n                ...user,\n                password: undefined\n            }\n        };\n        return [\n            200,\n            response\n        ];\n    } else {\n        error = {\n            email: [\n                \"email or Password is Invalid\"\n            ]\n        };\n        return [\n            400,\n            {\n                error\n            }\n        ];\n    }\n});\nsrc_fake_db_mock__WEBPACK_IMPORTED_MODULE_1__[\"default\"].onPost(\"/jwt/register\").reply((request)=>{\n    if (request.data.length > 0) {\n        const { email , password , username  } = JSON.parse(request.data);\n        const isEmailAlreadyInUse = users.find((user)=>user.email === email);\n        const isUsernameAlreadyInUse = users.find((user)=>user.username === username);\n        const error = {\n            email: isEmailAlreadyInUse ? \"This email is already in use.\" : null,\n            username: isUsernameAlreadyInUse ? \"This username is already in use.\" : null\n        };\n        if (!error.username && !error.email) {\n            const { length  } = users;\n            let lastIndex = 0;\n            if (length) {\n                lastIndex = users[length - 1].id;\n            }\n            const userData = {\n                id: lastIndex + 1,\n                email,\n                password,\n                username,\n                avatar: null,\n                fullName: \"\",\n                role: \"admin\"\n            };\n            users.push(userData);\n            const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n                id: userData.id\n            }, jwtConfig.secret);\n            const user = {\n                ...userData\n            };\n            delete user.password;\n            const response = {\n                accessToken\n            };\n            return [\n                200,\n                response\n            ];\n        }\n        return [\n            200,\n            {\n                error\n            }\n        ];\n    } else {\n        return [\n            401,\n            {\n                error: \"Invalid Data\"\n            }\n        ];\n    }\n});\nsrc_fake_db_mock__WEBPACK_IMPORTED_MODULE_1__[\"default\"].onGet(\"/auth/me\").reply((config)=>{\n    // ** Get token from header\n    // @ts-ignore\n    const token = config.headers.Authorization;\n    // ** Default response\n    let response = [\n        200,\n        {}\n    ];\n    // ** Checks if the token is valid or expired\n    jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, jwtConfig.secret, (err, decoded)=>{\n        // ** If token is expired\n        if (err) {\n            // ** If onTokenExpiration === 'logout' then send 401 error\n            if (src_configs_auth__WEBPACK_IMPORTED_MODULE_2__[\"default\"].onTokenExpiration === \"logout\") {\n                // ** 401 response will logout user from AuthContext file\n                response = [\n                    401,\n                    {\n                        error: {\n                            error: \"Invalid User\"\n                        }\n                    }\n                ];\n            } else {\n                // ** If onTokenExpiration === 'refreshToken' then generate the new token\n                const oldTokenDecoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().decode(token, {\n                    complete: true\n                });\n                // ** Get user id from old token\n                // @ts-ignore\n                const { id: userId  } = oldTokenDecoded.payload;\n                // ** Get user that matches id in token\n                const user = users.find((u)=>u.id === userId);\n                // ** Sign a new token\n                const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n                    id: userId\n                }, jwtConfig.secret, {\n                    expiresIn: jwtConfig.expirationTime\n                });\n                // ** Set new token in localStorage\n                window.localStorage.setItem(src_configs_auth__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storageTokenKeyName, accessToken);\n                const obj = {\n                    userData: {\n                        ...user,\n                        password: undefined\n                    }\n                };\n                // ** return 200 with user data\n                response = [\n                    200,\n                    obj\n                ];\n            }\n        } else {\n            // ** If token is valid do nothing\n            // @ts-ignore\n            const userId = decoded.id;\n            // ** Get user that matches id in token\n            const userData = JSON.parse(JSON.stringify(users.find((u)=>u.id === userId)));\n            delete userData.password;\n            // ** return 200 with user data\n            response = [\n                200,\n                {\n                    userData\n                }\n            ];\n        }\n    });\n    return response;\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU13QixJQUFJLENBQUNDLENBQUFBLElBQUtBLEVBQUV4QixFQUFFLEtBQUtpRDtnQkFFdEMsc0JBQXNCO2dCQUN0QixNQUFNeEIsY0FBYzdCLHdEQUFRLENBQUM7b0JBQUVJLElBQUlpRDtnQkFBTyxHQUFHM0MsVUFBVUMsTUFBTSxFQUFZO29CQUN2RW9CLFdBQVdyQixVQUFVSyxjQUFjO2dCQUNyQztnQkFFQSxtQ0FBbUM7Z0JBQ25Dd0MsT0FBT0MsWUFBWSxDQUFDQyxPQUFPLENBQUN2RCw0RUFBcUMsRUFBRTJCO2dCQUVuRSxNQUFNOEIsTUFBTTtvQkFBRTFCLFVBQVU7d0JBQUUsR0FBR1AsSUFBSTt3QkFBRXBCLFVBQVU0QjtvQkFBVTtnQkFBRTtnQkFFekQsK0JBQStCO2dCQUMvQkYsV0FBVztvQkFBQztvQkFBSzJCO2lCQUFJO1lBQ3ZCLENBQUM7UUFDSCxPQUFPO1lBQ0wsa0NBQWtDO1lBQ2xDLGFBQWE7WUFDYixNQUFNTixTQUFTTCxRQUFRNUMsRUFBRTtZQUV6Qix1Q0FBdUM7WUFDdkMsTUFBTTZCLFdBQVdYLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS3NDLFNBQVMsQ0FBQ3pELE1BQU13QixJQUFJLENBQUMsQ0FBQ0MsSUFBb0JBLEVBQUV4QixFQUFFLEtBQUtpRDtZQUVwRixPQUFPcEIsU0FBUzNCLFFBQVE7WUFFeEIsK0JBQStCO1lBQy9CMEIsV0FBVztnQkFBQztnQkFBSztvQkFBRUM7Z0JBQVM7YUFBRTtRQUNoQyxDQUFDO0lBQ0g7SUFFQSxPQUFPRDtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9AZmFrZS1kYi9hdXRoL2p3dC50cz9hMjk1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vICoqIEpXVCBpbXBvcnRcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXHJcblxyXG4vLyAqKiBNb2NrIEFkYXB0ZXJcclxuaW1wb3J0IG1vY2sgZnJvbSAnc3JjL0BmYWtlLWRiL21vY2snXHJcblxyXG4vLyAqKiBEZWZhdWx0IEF1dGhDb25maWdcclxuaW1wb3J0IGRlZmF1bHRBdXRoQ29uZmlnIGZyb20gJ3NyYy9jb25maWdzL2F1dGgnXHJcblxyXG4vLyAqKiBUeXBlc1xyXG5pbXBvcnQgeyBVc2VyRGF0YVR5cGUgfSBmcm9tICdzcmMvY29udGV4dC90eXBlcydcclxuXHJcbmNvbnN0IHVzZXJzOiBVc2VyRGF0YVR5cGVbXSA9IFtcclxuICB7XHJcbiAgICBpZDogMSxcclxuICAgIHJvbGU6ICdhZG1pbicsXHJcbiAgICBwYXNzd29yZDogJ2FkbWluJyxcclxuICAgIGZ1bGxOYW1lOiAnSm9obiBEb2UnLFxyXG4gICAgdXNlcm5hbWU6ICdqb2huZG9lJyxcclxuICAgIGVtYWlsOiAnYWRtaW5AYWVyYmFnLmNvbSdcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgcm9sZTogJ2NsaWVudCcsXHJcbiAgICBwYXNzd29yZDogJ2NsaWVudCcsXHJcbiAgICBmdWxsTmFtZTogJ0phbmUgRG9lJyxcclxuICAgIHVzZXJuYW1lOiAnamFuZWRvZScsXHJcbiAgICBlbWFpbDogJ2NsaWVudEB2dWV4eS5jb20nXHJcbiAgfVxyXG5dXHJcblxyXG4vLyAhIFRoZXNlIHR3byBzZWNyZXRzIHNob3VsZCBiZSBpbiAuZW52IGZpbGUgYW5kIG5vdCBpbiBhbnkgb3RoZXIgZmlsZVxyXG5jb25zdCBqd3RDb25maWcgPSB7XHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19KV1RfU0VDUkVULFxyXG4gIGV4cGlyYXRpb25UaW1lOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19KV1RfRVhQSVJBVElPTixcclxuICByZWZyZXNoVG9rZW5TZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0pXVF9SRUZSRVNIX1RPS0VOX1NFQ1JFVFxyXG59XHJcblxyXG50eXBlIFJlc3BvbnNlVHlwZSA9IFtudW1iZXIsIHsgW2tleTogc3RyaW5nXTogYW55IH1dXHJcblxyXG5tb2NrLm9uUG9zdCgnL2p3dC9sb2dpbicpLnJlcGx5KHJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBKU09OLnBhcnNlKHJlcXVlc3QuZGF0YSlcclxuXHJcbiAgbGV0IGVycm9yID0ge1xyXG4gICAgZW1haWw6IFsnU29tZXRoaW5nIHdlbnQgd3JvbmcnXVxyXG4gIH1cclxuXHJcbiAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQodSA9PiB1LmVtYWlsID09PSBlbWFpbCAmJiB1LnBhc3N3b3JkID09PSBwYXNzd29yZClcclxuXHJcbiAgaWYgKHVzZXIpIHtcclxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gand0LnNpZ24oeyBpZDogdXNlci5pZCB9LCBqd3RDb25maWcuc2VjcmV0IGFzIHN0cmluZywgeyBleHBpcmVzSW46IGp3dENvbmZpZy5leHBpcmF0aW9uVGltZSB9KVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xyXG4gICAgICBhY2Nlc3NUb2tlbixcclxuICAgICAgdXNlckRhdGE6IHsgLi4udXNlciwgcGFzc3dvcmQ6IHVuZGVmaW5lZCB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFsyMDAsIHJlc3BvbnNlXVxyXG4gIH0gZWxzZSB7XHJcbiAgICBlcnJvciA9IHtcclxuICAgICAgZW1haWw6IFsnZW1haWwgb3IgUGFzc3dvcmQgaXMgSW52YWxpZCddXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFs0MDAsIHsgZXJyb3IgfV1cclxuICB9XHJcbn0pXHJcblxyXG5tb2NrLm9uUG9zdCgnL2p3dC9yZWdpc3RlcicpLnJlcGx5KHJlcXVlc3QgPT4ge1xyXG4gIGlmIChyZXF1ZXN0LmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIHVzZXJuYW1lIH0gPSBKU09OLnBhcnNlKHJlcXVlc3QuZGF0YSlcclxuICAgIGNvbnN0IGlzRW1haWxBbHJlYWR5SW5Vc2UgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci5lbWFpbCA9PT0gZW1haWwpXHJcbiAgICBjb25zdCBpc1VzZXJuYW1lQWxyZWFkeUluVXNlID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcm5hbWUgPT09IHVzZXJuYW1lKVxyXG4gICAgY29uc3QgZXJyb3IgPSB7XHJcbiAgICAgIGVtYWlsOiBpc0VtYWlsQWxyZWFkeUluVXNlID8gJ1RoaXMgZW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuJyA6IG51bGwsXHJcbiAgICAgIHVzZXJuYW1lOiBpc1VzZXJuYW1lQWxyZWFkeUluVXNlID8gJ1RoaXMgdXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuJyA6IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWVycm9yLnVzZXJuYW1lICYmICFlcnJvci5lbWFpbCkge1xyXG4gICAgICBjb25zdCB7IGxlbmd0aCB9ID0gdXNlcnNcclxuICAgICAgbGV0IGxhc3RJbmRleCA9IDBcclxuICAgICAgaWYgKGxlbmd0aCkge1xyXG4gICAgICAgIGxhc3RJbmRleCA9IHVzZXJzW2xlbmd0aCAtIDFdLmlkXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdXNlckRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IGxhc3RJbmRleCArIDEsXHJcbiAgICAgICAgZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQsXHJcbiAgICAgICAgdXNlcm5hbWUsXHJcbiAgICAgICAgYXZhdGFyOiBudWxsLFxyXG4gICAgICAgIGZ1bGxOYW1lOiAnJyxcclxuICAgICAgICByb2xlOiAnYWRtaW4nXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVzZXJzLnB1c2godXNlckRhdGEpXHJcblxyXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGp3dC5zaWduKHsgaWQ6IHVzZXJEYXRhLmlkIH0sIGp3dENvbmZpZy5zZWNyZXQgYXMgc3RyaW5nKVxyXG5cclxuICAgICAgY29uc3QgdXNlciA9IHsgLi4udXNlckRhdGEgfVxyXG4gICAgICBkZWxldGUgdXNlci5wYXNzd29yZFxyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IGFjY2Vzc1Rva2VuIH1cclxuXHJcbiAgICAgIHJldHVybiBbMjAwLCByZXNwb25zZV1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gWzIwMCwgeyBlcnJvciB9XVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gWzQwMSwgeyBlcnJvcjogJ0ludmFsaWQgRGF0YScgfV1cclxuICB9XHJcbn0pXHJcblxyXG5tb2NrLm9uR2V0KCcvYXV0aC9tZScpLnJlcGx5KGNvbmZpZyA9PiB7XHJcbiAgLy8gKiogR2V0IHRva2VuIGZyb20gaGVhZGVyXHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIGNvbnN0IHRva2VuID0gY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiBhcyBzdHJpbmdcclxuXHJcbiAgLy8gKiogRGVmYXVsdCByZXNwb25zZVxyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2VUeXBlID0gWzIwMCwge31dXHJcblxyXG4gIC8vICoqIENoZWNrcyBpZiB0aGUgdG9rZW4gaXMgdmFsaWQgb3IgZXhwaXJlZFxyXG4gIGp3dC52ZXJpZnkodG9rZW4sIGp3dENvbmZpZy5zZWNyZXQgYXMgc3RyaW5nLCAoZXJyLCBkZWNvZGVkKSA9PiB7XHJcbiAgICAvLyAqKiBJZiB0b2tlbiBpcyBleHBpcmVkXHJcbiAgICBpZiAoZXJyKSB7XHJcbiAgICAgIC8vICoqIElmIG9uVG9rZW5FeHBpcmF0aW9uID09PSAnbG9nb3V0JyB0aGVuIHNlbmQgNDAxIGVycm9yXHJcbiAgICAgIGlmIChkZWZhdWx0QXV0aENvbmZpZy5vblRva2VuRXhwaXJhdGlvbiA9PT0gJ2xvZ291dCcpIHtcclxuICAgICAgICAvLyAqKiA0MDEgcmVzcG9uc2Ugd2lsbCBsb2dvdXQgdXNlciBmcm9tIEF1dGhDb250ZXh0IGZpbGVcclxuICAgICAgICByZXNwb25zZSA9IFs0MDEsIHsgZXJyb3I6IHsgZXJyb3I6ICdJbnZhbGlkIFVzZXInIH0gfV1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAqKiBJZiBvblRva2VuRXhwaXJhdGlvbiA9PT0gJ3JlZnJlc2hUb2tlbicgdGhlbiBnZW5lcmF0ZSB0aGUgbmV3IHRva2VuXHJcbiAgICAgICAgY29uc3Qgb2xkVG9rZW5EZWNvZGVkID0gand0LmRlY29kZSh0b2tlbiwgeyBjb21wbGV0ZTogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAvLyAqKiBHZXQgdXNlciBpZCBmcm9tIG9sZCB0b2tlblxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBjb25zdCB7IGlkOiB1c2VySWQgfSA9IG9sZFRva2VuRGVjb2RlZC5wYXlsb2FkXHJcblxyXG4gICAgICAgIC8vICoqIEdldCB1c2VyIHRoYXQgbWF0Y2hlcyBpZCBpbiB0b2tlblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gdXNlcklkKVxyXG5cclxuICAgICAgICAvLyAqKiBTaWduIGEgbmV3IHRva2VuXHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBqd3Quc2lnbih7IGlkOiB1c2VySWQgfSwgand0Q29uZmlnLnNlY3JldCBhcyBzdHJpbmcsIHtcclxuICAgICAgICAgIGV4cGlyZXNJbjogand0Q29uZmlnLmV4cGlyYXRpb25UaW1lXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gKiogU2V0IG5ldyB0b2tlbiBpbiBsb2NhbFN0b3JhZ2VcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oZGVmYXVsdEF1dGhDb25maWcuc3RvcmFnZVRva2VuS2V5TmFtZSwgYWNjZXNzVG9rZW4pXHJcblxyXG4gICAgICAgIGNvbnN0IG9iaiA9IHsgdXNlckRhdGE6IHsgLi4udXNlciwgcGFzc3dvcmQ6IHVuZGVmaW5lZCB9IH1cclxuXHJcbiAgICAgICAgLy8gKiogcmV0dXJuIDIwMCB3aXRoIHVzZXIgZGF0YVxyXG4gICAgICAgIHJlc3BvbnNlID0gWzIwMCwgb2JqXVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAqKiBJZiB0b2tlbiBpcyB2YWxpZCBkbyBub3RoaW5nXHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgY29uc3QgdXNlcklkID0gZGVjb2RlZC5pZFxyXG5cclxuICAgICAgLy8gKiogR2V0IHVzZXIgdGhhdCBtYXRjaGVzIGlkIGluIHRva2VuXHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh1c2Vycy5maW5kKCh1OiBVc2VyRGF0YVR5cGUpID0+IHUuaWQgPT09IHVzZXJJZCkpKVxyXG5cclxuICAgICAgZGVsZXRlIHVzZXJEYXRhLnBhc3N3b3JkXHJcblxyXG4gICAgICAvLyAqKiByZXR1cm4gMjAwIHdpdGggdXNlciBkYXRhXHJcbiAgICAgIHJlc3BvbnNlID0gWzIwMCwgeyB1c2VyRGF0YSB9XVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiByZXNwb25zZVxyXG59KVxyXG4iXSwibmFtZXMiOlsiand0IiwibW9jayIsImRlZmF1bHRBdXRoQ29uZmlnIiwidXNlcnMiLCJpZCIsInJvbGUiLCJwYXNzd29yZCIsImZ1bGxOYW1lIiwidXNlcm5hbWUiLCJlbWFpbCIsImp3dENvbmZpZyIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19KV1RfU0VDUkVUIiwiZXhwaXJhdGlvblRpbWUiLCJORVhUX1BVQkxJQ19KV1RfRVhQSVJBVElPTiIsInJlZnJlc2hUb2tlblNlY3JldCIsIk5FWFRfUFVCTElDX0pXVF9SRUZSRVNIX1RPS0VOX1NFQ1JFVCIsIm9uUG9zdCIsInJlcGx5IiwicmVxdWVzdCIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJlcnJvciIsInVzZXIiLCJmaW5kIiwidSIsImFjY2Vzc1Rva2VuIiwic2lnbiIsImV4cGlyZXNJbiIsInJlc3BvbnNlIiwidXNlckRhdGEiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJpc0VtYWlsQWxyZWFkeUluVXNlIiwiaXNVc2VybmFtZUFscmVhZHlJblVzZSIsImxhc3RJbmRleCIsImF2YXRhciIsInB1c2giLCJvbkdldCIsImNvbmZpZyIsInRva2VuIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJ2ZXJpZnkiLCJlcnIiLCJkZWNvZGVkIiwib25Ub2tlbkV4cGlyYXRpb24iLCJvbGRUb2tlbkRlY29kZWQiLCJkZWNvZGUiLCJjb21wbGV0ZSIsInVzZXJJZCIsInBheWxvYWQiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RvcmFnZVRva2VuS2V5TmFtZSIsIm9iaiIsInN0cmluZ2lmeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/@fake-db/auth/jwt.ts\n"));

/***/ })

});