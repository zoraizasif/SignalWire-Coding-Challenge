
# SignalWire Coding Challenge
Coding asssignment for SignalWire related to `Websockets`, `TypeScript`, and `NPM Workspaces`.



## Getting Started

**1:** Install dependencies
```
npm i
```
**2:** Build the project
```
npm run build
```

## Running Workspaces

### Node SDK

**1:** Starting the SDK - [will start the server on port **8080**]
```
npm start -w @signalwire/node-sdk
```

**2:** [Go to this link](https://www.piesocket.com/websocket-tester)

**3:** Enter the following WebSocket URL in the input box and click *Connect* 
```
ws://localhost:8080
```

**4:** You can see on the *Websocket Tester* website that a new message is being sent automatically after every 5 seconds. Also, you can send messages from the *Websocket Tester* to the SDK

**5:** Verify that the sent and received messages are being logged in the `log.txt` file in the *node-sdk* directory


### Browser SDK

**1:** Starting the SDK - [will start the client and open an HTML file]
```
npm start -w @signalwire/browser-sdk
```

**2:** [Go to this link](https://www.piesocket.com/websocket-tester)

**3:** Enter  the following WebSocket URL in the input box and click *Connect* 
```
wss://demo.piesocket.com/v3/channel_signalwire?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV
```

**4:** You can see on the *Websocket Tester* Website that a new message is being sent automatically after every 5 seconds. Also, you can send messages from the *Websocket Tester* to the SDK

**5:** Verify that the sent and received messages are being shown and displayed in their respective lists on the HTML file that has opened up


### Demo + Installation Instructions Video 
[![DEMO VIDEO](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmqBOsbz09nhxbQQwuysuBth3Agbkp5vkLC1MUJswSdw&s)](https://www.loom.com/share/f18f5af0eddf4545957964bf6bef22d0)
