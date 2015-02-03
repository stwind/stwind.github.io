'use strict';

var addresses = {
  '0x00000000': { 
    layout: 'post', id: 'about', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0xa568c2d9': { 
    layout: 'post', id: 'angularity', 
    next: ['0x00000000','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x5dbd7439': { 
    layout: 'post', id: 'haskell-do', 
    next: ['0xa568c2d9','0x00000000','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x6842e34b': { 
    layout: 'post', id: 'hello-again', 
    next: ['0xa568c2d9','0x5dbd7439','0x00000000','0xe924d894','0x945613ad']
  },
  '0xe924d894': { 
    layout: 'post', id: 'infra-p1', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0x00000000','0x945613ad']
  },
  '0x945613ad': { 
    layout: 'post', id: 'py2erl', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x00000000']
  }
};

module.exports = {
  get: function (id) {
    return addresses[id];
  }
};
