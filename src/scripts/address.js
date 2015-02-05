'use strict';

var addresses = {
  '0x091de4f1': { 
    layout: 'post', id: 'about', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0xa568c2d9': { 
    layout: 'post', id: 'angularity', 
    next: ['0x091de4f1','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x5dbd7439': { 
    layout: 'post', id: 'haskell-do', 
    next: ['0xa568c2d9','0x091de4f1','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x6842e34b': { 
    layout: 'post', id: 'hello-again', 
    next: ['0xa568c2d9','0x5dbd7439','0x091de4f1','0xe924d894','0x945613ad']
  },
  '0xe924d894': { 
    layout: 'post', id: 'infra-p1', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0x091de4f1','0x945613ad']
  },
  '0x945613ad': { 
    layout: 'post', id: 'py2erl', 
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x091de4f1']
  }
};

module.exports = {
  get: function (id) {
    return addresses[id];
  }
};
