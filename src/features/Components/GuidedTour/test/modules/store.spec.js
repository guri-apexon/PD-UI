import createStore from '../../src/modules/store';

import LIFECYCLE from '../../src/constants/lifecycle';
import STATUS from '../../src/constants/status';

import stepsData from '../__fixtures__/steps';

const mockSyncStore = jest.fn();

describe('store', () => {
  beforeEach(() => {
    mockSyncStore.mockClear();
  });

  describe('without initial values', () => {
    const store = createStore();

    const { close, go, info, next, open, prev, reset, setSteps, start, stop, update } = store;

    it('should have initiated a new store', () => {
      expect(store.constructor.name).toBe('Store');

      expect(info()).toMatchSnapshot();
    });

    it("shouldn't be able to start without steps", () => {
      start();

      expect(info()).toMatchSnapshot();
    });

    it('should ignore all back/forward methods', () => {
      const initialStore = info();

      next();
      expect(info()).toEqual(initialStore);

      prev();
      expect(info()).toEqual(initialStore);

      go(2);
      expect(info()).toEqual(initialStore);
    });

    it('should be able to add steps', () => {
      setSteps(stepsData);

      expect(info()).toMatchSnapshot();
    });

    it('should handle "prev" but no changes [1st step]', () => {
      prev();

      expect(info()).toMatchSnapshot();
    });

    it(`should handle "update" the lifecycle to ${LIFECYCLE.BEACON}`, () => {
      update({ lifecycle: LIFECYCLE.BEACON });

      expect(info()).toMatchSnapshot();
    });

    it(`should handle "update" the lifecycle to ${LIFECYCLE.TOOLTIP}`, () => {
      update({ lifecycle: LIFECYCLE.TOOLTIP });

      expect(info()).toMatchSnapshot();
    });

    it('should throw an error with `update` with invalid keys', () => {
      expect(() =>
        update({ valid: true, lifecycle: LIFECYCLE.TOOLTIP }),
      ).toThrowErrorMatchingSnapshot();
    });

    it('should handle "next" [2nd step]', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "prev" [1st step]', () => {
      prev();

      expect(info()).toMatchSnapshot();
    });

    it('should handle `stop`', () => {
      stop();

      expect(info()).toMatchSnapshot();
    });

    it('should handle `start` [1st step]', () => {
      start();

      expect(info()).toMatchSnapshot();
    });

    it('should handle `stop` again but with `advance`', () => {
      stop(true);

      expect(info()).toMatchSnapshot();
    });

    it('should handle `start` [2nd step]', () => {
      start();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "next" [3rd step]', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "next" [4th step]', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "next" [5th step]', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it(`should handle "update" the lifecycle to ${LIFECYCLE.BEACON}`, () => {
      update({ lifecycle: LIFECYCLE.BEACON });

      expect(info()).toMatchSnapshot();
    });

    it('should handle "next" again but the tour has finished', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "next" again but there\'s no change to the store', () => {
      next();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "reset"', () => {
      reset();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "reset" to restart', () => {
      reset(true);

      expect(info()).toMatchSnapshot();
    });

    it('should handle "start" with custom index and lifecycle', () => {
      start(2);

      expect(info()).toMatchSnapshot();
    });

    it('should handle "go" [2nd step]', () => {
      go(2);

      expect(info()).toMatchSnapshot();
    });

    it('should handle "go" [3rd step]', () => {
      go(1);

      expect(info()).toMatchSnapshot();
    });

    it('should handle "close"', () => {
      close();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "open"', () => {
      open();

      expect(info()).toMatchSnapshot();
    });

    it('should handle "go" with a number higher that the steps length and finish the tour', () => {
      go(10);

      expect(info()).toMatchSnapshot();
    });
  });

  describe('with initial steps', () => {
    const store = createStore({ steps: stepsData });

    const { info, update } = store;

    it('should have initiated a new store', () => {
      expect(store.constructor.name).toBe('Store');

      expect(info()).toMatchSnapshot();
    });

    it('should handle listeners', () => {
      store.addListener(mockSyncStore);

      update({ status: STATUS.READY });
      update({ status: STATUS.READY });
      expect(mockSyncStore).toHaveBeenCalledTimes(1);

      update({ status: STATUS.IDLE });
      update({ status: STATUS.READY });

      expect(mockSyncStore).toHaveBeenCalledTimes(3);
    });
  });
});
