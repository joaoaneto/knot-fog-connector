# KNoT Fog connector service

This is a KNoT gateway service that connects the fog with a cloud service.

## Supported services

* [FIWARE](https://github.com/CESARBR/knot-fog-connector-fiware) (under development)

## Quickstart

1. Build: `npm run build`
1. Start: `npm start`

## Creating a connector

A connector is as a library that exports by default the `Connector` class. This service will use the library as follows:

```
import CustomCloudConnector from 'knot-fog-connector-customcloud';

...
const connector = new CustomCloudConnector(config);
await connector.start();
```

### Methods

#### constructor(config)

Creates the connector using a configuration object that will be loaded from a JSON file and passed directly to this constructor. No work, such as connecting to a service must be done in this constructor.

##### Argument

* `config` configuration parameters defined by the connector

##### Example

```
import CustomCloudConnector from 'knot-fog-connector-customcloud';

const connector = new CustomCloudConnector({
  hostname: 'localhost',
  port: 3000,
  protocol: 'ws',
  ...
});
```