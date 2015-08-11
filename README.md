# onion-oracle
Tor Browser Circuit-Building Timing Oracle/SideChannel

When Tor connects to an onion service, it builds a rendezvous circuit, fetching a descriptor, then talking to an introduction point defined in the descriptor and then eventually connecting to an agreed rendezvous point to talk to the service.

Because this process takes time, Tor will continue to use the same circuit for subsequent communications with the service. Each time it is used, it refreshes the circuit time-out (circuit dirtiness). This saves a lot of wasted resource because it is expensive to build such a circuit.

However, because of building the circuit is an length and expensive process it can act as a strong timing oracle. By utilising XMLHTTPRequests within the browser, it is possible to measure the time required for these requests to fail.

By taking two or more measurements, we are able to see how long a request would normally take and how long the request initially took, if the first request is not "significantly" larger than the second, then it is possibly because the user already had a circuit build for the onion in question which means they had previously connected to it.

This allows us to tell if a user has or has not recently connected to a certain onion service.

P.S. Excuse my terrible javascript.
