/**
 * The data structure used for the union-find algorithm, which merges overlapping 
 * subsets into disjoint subsets. This is used to determine whether a player has won;
 * i.e. there is a path going from one virtual node to another on the required sides. 
 */
export class UnionFind {
    groupIds: number[]; // todo: make private
    private sizes: number[];
    private count: number;
    
    /**
     * 
     * @param n 
     */
    // TODO: finish constructor
    constructor(n: number) {
        this.groupIds = new Array(n);
        for (let i = 0; i < n; i++) {
            this.groupIds[i] = i;
        }

        this.sizes = new Array(n).fill(1);
        this.count = n;
    }

    /**
     * 
     * @param index 
     * @returns a number representing the ID of the group that the node at the 
     * given board index is part of
     */
    find(index: number): number {
        while (this.groupIds[index] !== index) {
            index = this.groupIds[index];
        }
        return index;
    }

    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    union(p: number, q: number): void {
        const pGroupId = this.groupIds[p];
        const qGroupId = this.groupIds[q];

        if (pGroupId === qGroupId) {
            return;
        }

        const pGroupSize = this.sizes[pGroupId];
        const qGroupSize = this.sizes[qGroupId];

        if (pGroupSize > qGroupSize) {
            this.groupIds[qGroupId] = pGroupId;
            this.sizes[pGroupId] += this.sizes[qGroupId];
        }
        else {
            this.groupIds[pGroupId] = qGroupId;
            this.sizes[qGroupId] += this.sizes[pGroupId];
        }
        this.count--;
    }

    getCount(): number {
        return this.count;
    }
}