// Copyright 2021 99cloud
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { octaviaBase } from 'utils/constants';
import Base from '../base';

export class ListenerStore extends Base {
  get module() {
    return 'lbaas/listeners';
  }

  get apiVersion() {
    return octaviaBase();
  }

  get responseKey() {
    return 'listener';
  }

  get listResponseKey() {
    return 'listeners';
  }

  get listFilterByProject() {
    return true;
  }

  get mapperBeforeFetchProject() {
    return (data) => ({
      ...data,
      lbIds: data.loadbalancers.map((lb) => lb.id),
    });
  }

  // async listDidFetch(items, allProjects, filters) {
  //   if (items.length === 0) {
  //     return items;
  //   }
  //   const { loadBalancerId } = filters;
  //   const data = items.filter(it =>
  //     it.lbIds.indexOf(loadBalancerId) !== -1
  //   );
  //   return data;
  // }

  async detailDidFetch(item) {
    const { default_pool_id } = item;
    if (default_pool_id) {
      //  pool attach listener or loadbalancer ？
      try {
        const res = await request.get(
          `${this.apiVersion}/pools/${default_pool_id}`
        );
        item.default_pool = res.pool;
        return item;
      } catch (err) {
        return item;
      }
    } else {
      return item;
    }
  }
}

const globalListenerStore = new ListenerStore();

export default globalListenerStore;