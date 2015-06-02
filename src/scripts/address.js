var addresses = {
  '0x091de4f1': { 
    layout: 'post', id: 'about', title: 'п╬п╥я',
    // next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
    next: ['0xec63a4b9']
  },
  '0xa568c2d9': { 
    layout: 'post', id: 'angularity', title: 'The Angularity Is Here',
    next: ['0x091de4f1','0x5dbd7439','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x5dbd7439': { 
    layout: 'post', id: 'haskell-do', title: 'The Haskell Do notation',
    next: ['0xa568c2d9','0x091de4f1','0x6842e34b','0xe924d894','0x945613ad']
  },
  '0x6842e34b': { 
    layout: 'post', id: 'hello-again', title: 'Hello Again', 
    next: ['0xa568c2d9','0x5dbd7439','0x091de4f1','0xe924d894','0x945613ad']
  },
  '0xe924d894': { 
    layout: 'post', id: 'infra-p1', title: 'Infrastructure As Code Part 1',  
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0x091de4f1','0x945613ad']
  },
  '0x945613ad': { 
    layout: 'post', id: 'py2erl', title: 'Porting things from Python to Erlang',   
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x091de4f1']
  },
  '0xec63a4b9': { 
    layout: 'post', id: 'ansible-pl', title: 'A Practical Ansible Project Layout',   
    next: ['0xa568c2d9','0x5dbd7439','0x6842e34b','0xe924d894','0x091de4f1']
  }
};

export default function get(id) {
  return addresses[id];
};
