const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('Performance Controller', () => {
  let performanceController;
  let mockSystemInformation;

  beforeEach(() => {
    sinon.restore();
    
    // Mock systeminformation
    mockSystemInformation = {
      diskLayout: sinon.stub(),
      fsSize: sinon.stub(),
      networkStats: sinon.stub(),
      cpu: sinon.stub(),
      mem: sinon.stub(),
      load: sinon.stub(),
      time: sinon.stub()
    };

    const siModule = require('systeminformation');
    sinon.stub(siModule, 'diskLayout').callsFake(mockSystemInformation.diskLayout);
    sinon.stub(siModule, 'fsSize').callsFake(mockSystemInformation.fsSize);
    sinon.stub(siModule, 'networkStats').callsFake(mockSystemInformation.networkStats);
    sinon.stub(siModule, 'cpu').callsFake(mockSystemInformation.cpu);
    sinon.stub(siModule, 'mem').callsFake(mockSystemInformation.mem);
    sinon.stub(siModule, 'load').callsFake(mockSystemInformation.load);
    sinon.stub(siModule, 'time').callsFake(mockSystemInformation.time);

    performanceController = require('../../controllers/performanceController');
  });

  describe('monitorApiCall', () => {
    it('should monitor API call and store in recent calls', () => {
      const req = {
        path: '/api/users',
        method: 'GET',
        ip: '192.168.1.1',
        get: sinon.stub().returns('test-agent')
      };

      const res = {
        statusCode: 200,
        send: sinon.stub()
      };

      const next = sinon.stub();

      performanceController.monitorApiCall(req, res, next);

      expect(next).to.have.been.calledWith();

      // Simulate response
      res.send('{"data": "test"}');

      expect(res.send).to.have.been.calledWith('{"data": "test"}');
    });

    it('should filter out monitoring endpoints from recent calls', () => {
      const req = {
        path: '/api/performance/metrics',
        method: 'GET',
        ip: '192.168.1.1',
        get: sinon.stub().returns('test-agent')
      };

      const res = {
        statusCode: 200,
        send: sinon.stub()
      };

      const next = sinon.stub();

      performanceController.monitorApiCall(req, res, next);

      expect(next).to.have.been.calledWith();

      // Simulate response
      res.send('{"metrics": "data"}');

      expect(res.send).to.have.been.calledWith('{"metrics": "data"}');
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return performance metrics', async () => {
      const req = {};
      const res = {
        json: sinon.stub()
      };

      // Mock system information responses
      mockSystemInformation.cpu.resolves({
        load: 45.2,
        speed: 2.4,
        cores: 4
      });

      mockSystemInformation.mem.resolves({
        total: 8192,
        used: 4096,
        free: 4096
      });

      mockSystemInformation.load.resolves({
        avgLoad: 1.2
      });

      await performanceController.getPerformanceMetrics(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('cpu');
      expect(response).to.have.property('memory');
      expect(response).to.have.property('load');
      expect(response).to.have.property('apiMetrics');
    });

    it('should handle system information errors', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      mockSystemInformation.cpu.rejects(new Error('CPU info failed'));

      await performanceController.getPerformanceMetrics(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({
        error: 'Failed to fetch performance metrics'
      });
    });
  });

  describe('getRecentApiCalls', () => {
    it('should return recent API calls with default limit', async () => {
      const req = {
        query: {}
      };

      const res = {
        json: sinon.stub()
      };

      await performanceController.getRecentApiCalls(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('calls');
      expect(response).to.have.property('total');
    });

    it('should return recent API calls with custom limit', async () => {
      const req = {
        query: { limit: '10' }
      };

      const res = {
        json: sinon.stub()
      };

      await performanceController.getRecentApiCalls(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('calls');
      expect(response).to.have.property('total');
    });
  });

  describe('getSystemHealth', () => {
    it('should return system health status', async () => {
      const req = {};
      const res = {
        json: sinon.stub()
      };

      // Mock system information responses
      mockSystemInformation.cpu.resolves({
        load: 45.2
      });

      mockSystemInformation.mem.resolves({
        total: 8192,
        used: 4096
      });

      mockSystemInformation.load.resolves({
        avgLoad: 1.2
      });

      await performanceController.getSystemHealth(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('status');
      expect(response).to.have.property('uptime');
      expect(response).to.have.property('services');
    });

    it('should handle system information errors', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      mockSystemInformation.cpu.rejects(new Error('System info failed'));

      await performanceController.getSystemHealth(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({
        error: 'Failed to fetch system health'
      });
    });
  });

  describe('getPerformanceHistory', () => {
    it('should return performance history with default hours', async () => {
      const req = {
        query: {}
      };

      const res = {
        json: sinon.stub()
      };

      await performanceController.getPerformanceHistory(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('timestamps');
      expect(response).to.have.property('metrics');
    });

    it('should return performance history with custom hours', async () => {
      const req = {
        query: { hours: '12' }
      };

      const res = {
        json: sinon.stub()
      };

      await performanceController.getPerformanceHistory(req, res);

      expect(res.json).to.have.been.calledWith(sinon.match.object);
      const response = res.json.firstCall.args[0];
      expect(response).to.have.property('timestamps');
      expect(response).to.have.property('metrics');
    });
  });

  describe('getDiskUsage', () => {
    it('should return disk usage information', async () => {
      mockSystemInformation.diskLayout.resolves([
        {
          device: '/dev/sda',
          size: 1000000000000,
          type: 'SSD'
        }
      ]);

      mockSystemInformation.fsSize.resolves([
        {
          fs: '/',
          size: 1000000000000,
          used: 500000000000,
          available: 500000000000
        }
      ]);

      const result = await performanceController.getDiskUsage();

      expect(result).to.have.property('total');
      expect(result).to.have.property('used');
      expect(result).to.have.property('available');
      expect(result).to.have.property('usage');
    });

    it('should handle disk information errors', async () => {
      mockSystemInformation.diskLayout.rejects(new Error('Disk info failed'));

      const result = await performanceController.getDiskUsage();

      expect(result).to.deep.equal({
        total: 0,
        used: 0,
        available: 0,
        usage: 0
      });
    });
  });

  describe('getNetworkUsage', () => {
    it('should return network usage information', async () => {
      mockSystemInformation.networkStats.resolves([
        {
          iface: 'eth0',
          rx_bytes: 1000000,
          tx_bytes: 500000,
          rx_dropped: 0,
          tx_dropped: 0
        }
      ]);

      const result = await performanceController.getNetworkUsage();

      expect(result).to.have.property('rx_bytes');
      expect(result).to.have.property('tx_bytes');
      expect(result).to.have.property('rx_dropped');
      expect(result).to.have.property('tx_dropped');
    });

    it('should handle network information errors', async () => {
      mockSystemInformation.networkStats.rejects(new Error('Network info failed'));

      const result = await performanceController.getNetworkUsage();

      expect(result).to.deep.equal({
        rx_bytes: 0,
        tx_bytes: 0,
        rx_dropped: 0,
        tx_dropped: 0
      });
    });
  });

  describe('calculateApiMetrics', () => {
    it('should calculate API metrics correctly', () => {
      const apiCalls = [
        { responseTime: 100, status: 200 },
        { responseTime: 200, status: 200 },
        { responseTime: 150, status: 404 },
        { responseTime: 300, status: 500 }
      ];

      const metrics = performanceController.calculateApiMetrics(apiCalls);

      expect(metrics).to.have.property('totalCalls');
      expect(metrics).to.have.property('averageResponseTime');
      expect(metrics).to.have.property('successRate');
      expect(metrics).to.have.property('errorRate');
    });

    it('should handle empty API calls array', () => {
      const apiCalls = [];

      const metrics = performanceController.calculateApiMetrics(apiCalls);

      expect(metrics).to.deep.equal({
        totalCalls: 0,
        averageResponseTime: 0,
        successRate: 0,
        errorRate: 0
      });
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
      const timestamp = new Date('2023-01-01T12:00:00Z');

      const formatted = performanceController.formatTimestamp(timestamp);

      expect(formatted).to.be.a('string');
      expect(formatted).to.match(/^\d{2}:\d{2}:\d{2}$/);
    });
  });
}); 