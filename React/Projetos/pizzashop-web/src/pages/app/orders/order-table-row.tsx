import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";

import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";

import { OrderStatus } from "../../../components/order-status";
import { OrderDetails } from "./order-details";

interface OrderTableRowProps {
	order: {
		orderId: string;
		createdAt: string;
		status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
		customerName: string;
		total: number;
	};
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

	function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
		const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ["orders"],
		});

		ordersListCache.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) {
				return;
			}

			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return { ...order, status };
					}

					return order;
				}),
			});
		});
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, "canceled");
			},
		});

	const { mutateAsync: approveOrderFn, isPending: isApproveOrder } =
		useMutation({
			mutationFn: approveOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, "processing");
			},
		});

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, "delivering");
			},
		});

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, "delivered");
			},
		});

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhe do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails open={isDetailsOpen} orderId={order.orderId} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{order.total.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</TableCell>

			{order.status === "pending" && (
				<TableCell>
					<Button
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApproveOrder}
						variant="outline"
						size="xs"
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Aprovar
					</Button>
				</TableCell>
			)}

			{order.status === "processing" && (
				<TableCell>
					<Button
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isDispatchingOrder}
						variant="outline"
						size="xs"
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Em entrega
					</Button>
				</TableCell>
			)}

			{order.status === "delivering" && (
				<TableCell>
					<Button
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder}
						variant="outline"
						size="xs"
					>
						<ArrowRight className="mr-2 h-3 w-3" />
						Entregue
					</Button>
				</TableCell>
			)}

			<TableCell>
				<Button
					disabled={
						!["pending", "processing"].includes(order.status) ||
						isCancelingOrder
					}
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
					variant="ghost"
					size="xs"
				>
					<X className="mr-2 h-3 w-3" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
