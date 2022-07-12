# Valex

## Usage

```bash
$ git clone https://github.com/$username-github/$nome-repositorio

$ cd $nome-repositorio

$ npm install

$ npm run dev
```

API:



```
- POST /cards/new-card
    esta rota aceita string como numero do cartao e CVC,
    mas um middleware gera corretamente estes dados que substituem
    os da requisicao, antes do schema ser validado !
    
    - Rota para cadastrar um novo cartão
    - headers: { "x-api-key" : "$company-api-key" }
    - body: {
        "employeeId": 1,
        "number": "0123456789ABCDEF",
        "securityCode": "CVC",
        "isVirtual": false,
        "originalCardId": null,
        "isBlocked": true,
        "type": "groceries"
        }
        
- POST /cards/:id/activate
    - Rota para ativar um cartão
    - headers: {}
    - body: {
        "securityCode": "XYZ",
        "password": "0123" (string numerica 4 digitos),
        }

- PUT /cards/:id/block
    - Rota para bloquear um cartão
    - headers: {}
    - body: {
        "password": "0123" (string numerica 4 digitos),
        }

- PUT /cards/:id/unblock
    - Rota para desbloquear um cartão
    - headers: {}
    - body: {
        "password": "0123" (string numerica 4 digitos),
        }

- POST /recharges/:id
    - Rota para recarregar um cartão
    - headers: { "x-api-key" : "$company-api-key" }
    - body: {
        "amount" : numero, valor em centavos, minimo 1,
    }

- POST /payments/new/:businessId/:cardId
    - Rota para pagar com cartão
    - headers: {}
    - body: {
        "amount" : numero, valor em centavos, minimo 1,
        "password": "0123" (string numerica 4 digitos),
    }

```