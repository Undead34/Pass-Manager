const crypto = require("crypto")

class AES {
    constructor() {
        this.name = "AES";
        this.algorithm = {
            "128": {
                "cbc": {
                    "name": "aes-128-cbc",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ccm": {
                    "name": "aes-128-ccm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb": {
                    "name": "aes-128-cfb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb1": {
                    "name": "aes-128-cfb1",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb8": {
                    "name": "aes-128-cfb8",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ctr": {
                    "name": "aes-128-ctr",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ecb": {
                    "name": "aes-128-ecb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "gcm": {
                    "name": "aes-128-gcm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ocb": {
                    "name": "aes-128-ocb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ofb": {
                    "name": "aes-128-ofb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "xts": {
                    "name": "aes-128-xts",
                    "keylen": 16,
                    "ivlen": 16
                },
                "hmac": {
                    "sha1": {
                        "name": "aes-128-cbc-hmac-sha1",
                        "keylen": 16,
                        "ivlen": 16
                    },
                    "sha256": {
                        "name": "aes-128-cbc-hmac-sha256",
                        "keylen": 16,
                        "ivlen": 16
                    }
                }
            },
            "192": {
                "cbc": {
                    "name": "aes-192-cbc",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ccm": {
                    "name": "aes-192-ccm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb": {
                    "name": "aes-192-cfb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb1": {
                    "name": "aes-192-cfb1",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb8": {
                    "name": "aes-192-cfb8",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ctr": {
                    "name": "aes-192-ctr",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ecb": {
                    "name": "aes-192-ecb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "gcm": {
                    "name": "aes-192-gcm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ocb": {
                    "name": "aes-192-ocb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ofb": {
                    "name": "aes-192-ofb",
                    "keylen": 16,
                    "ivlen": 16
                }
            },
            "256": {
                "cbc": {
                    "name": "aes-256-cbc",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ccm": {
                    "name": "aes-256-ccm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb": {
                    "name": "aes-256-cfb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb1": {
                    "name": "aes-256-cfb1",
                    "keylen": 16,
                    "ivlen": 16
                },
                "cfb8": {
                    "name": "aes-256-cfb8",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ctr": {
                    "name": "aes-256-ctr",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ecb": {
                    "name": "aes-256-ecb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "gcm": {
                    "name": "aes-256-gcm",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ocb": {
                    "name": "aes-256-ocb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "ofb": {
                    "name": "aes-256-ofb",
                    "keylen": 16,
                    "ivlen": 16
                },
                "xts": {
                    "name": "aes-256-xts",
                    "keylen": 16,
                    "ivlen": 16
                },
                "hmac": {
                    "sha1": {
                        "name": "aes-256-cbc-hmac-sha1",
                        "keylen": 16,
                        "ivlen": 16
                    },
                    "sha256": {
                        "name": "aes-256-cbc-hmac-sha256",
                        "keylen": 16,
                        "ivlen": 16
                    }
                }
            }
        }
    }

    encrypt() {
        
    }

    decrypt() {

    }
}

module.exports = AES;












// let ALGORITMS = {
//     "aria": {
//         "128": {
//             "cbc": {
//                 "name": "aria-128-cbc",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ccm": {
//                 "name": "aria-128-ccm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb": {
//                 "name": "aria-128-cfb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb1": {
//                 "name": "aria-128-cfb1",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb8": {
//                 "name": "aria-128-cfb8",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ctr": {
//                 "name": "aria-128-ctr",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ecb": {
//                 "name": "aria-128-ecb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "gcm": {
//                 "name": "aria-128-gcm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ofb": {
//                 "name": "aria-128-ofb",
//                 "keylen": 16,
//                 "ivlen": 16
//             }
//         },
//         "192": {
//             "cbc": {
//                 "name": "aria-192-cbc",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ccm": {
//                 "name": "aria-192-ccm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb": {
//                 "name": "aria-192-cfb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb1": {
//                 "name": "aria-192-cfb1",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb8": {
//                 "name": "aria-192-cfb8",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ctr": {
//                 "name": "aria-192-ctr",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ecb": {
//                 "name": "aria-192-ecb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "gcm": {
//                 "name": "aria-192-gcm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ofb": {
//                 "name": "aria-192-ofb",
//                 "keylen": 16,
//                 "ivlen": 16
//             }
//         },
//         "256": {
//             "cbc": {
//                 "name": "aria-256-cbc",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ccm": {
//                 "name": "aria-256-ccm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb": {
//                 "name": "aria-256-cfb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb1": {
//                 "name": "aria-256-cfb1",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "cfb8": {
//                 "name": "aria-256-cfb8",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ctr": {
//                 "name": "aria-256-ctr",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ecb": {
//                 "name": "aria-256-ecb",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "gcm": {
//                 "name": "aria-256-gcm",
//                 "keylen": 16,
//                 "ivlen": 16
//             },
//             "ofb": {
//                 "name": "aria-256-ofb",
//                 "keylen": 16,
//                 "ivlen": 16
//             }
//         }
//     }
// }